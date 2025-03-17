import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import { ViewUsersStyles } from "../../styles/ViewUsersStyles";
import { useState } from "react";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import { useQuery } from "@tanstack/react-query";
import { CategoriesType, MenuType } from "../../types";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useCustomColors } from "../../hook/useCustomColors";
import { MenuStyles } from "../../styles/MenuStyles";
import ModalAddMenu from "../../components/ModalAddMenu";
import ModalDelete from "../../components/ModalDelete";

const ViewMenu = () => {
    const Style = ViewUsersStyles();
    const StyleMenu = MenuStyles();
    const { iconColor, buttonBackground } = useCustomColors();
    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchRoles = async () => {
        const response = await fetch(`${API_URL}/api/getMenu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    };

    const fetchCategory = async () => {
        const response = await fetch(`${API_URL}/api/getCategory`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.categories;
    };

    const { data, isLoading, error, isError, refetch } = useQuery<MenuType[]>({
        queryKey: ["viewMenu"],
        queryFn: fetchRoles,
    });

    const { data: category } = useQuery<CategoriesType[]>({
        queryKey: ["categories"],
        queryFn: fetchCategory,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const filteredData = data?.filter(menu =>
        menu.NAME_MENU?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        menu.CATEGORY_NAME?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const [openModalAddMenu, setOpenModalAddMenu] = useState(false);

    const handleOpenModalAdd = () => setOpenModalAddMenu(true);

    const handleCloseModalAdd = () => {
        setOpenModalAddMenu(false);
        refetch();
    }

    const [openModalEditMenu, setOpenModalEditMenu] = useState(false);
    const [menuEdit, setMenuEdit] = useState<MenuType | null>(null);

    const handleOpenModalEdit = (menu: MenuType) => {
        setOpenModalEditMenu(true);
        setMenuEdit(menu);
    };

    const handleCloseModalEdit = () => {
        setMenuEdit(null);
        setOpenModalEditMenu(false);
        refetch();
    };

    const [openModalDeleteMenu, setOpenModalDeleteMenu] = useState(false);
    const [menuDelete, setMenuDelete] = useState<MenuType | null>(null);

    const handleOpenModalDelete = (menu: MenuType) => {
        setOpenModalDeleteMenu(true);
        setMenuDelete(menu);
    };

    const handleCloseModalDelete = () => {
        setMenuDelete(null);
        setOpenModalDeleteMenu(false);
        refetch();
    };

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar platillo..."
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={handleOpenModalAdd}
                    style={Style.addButton}
                >
                    Agregar
                </Button>
            </Appbar.Header>

            <View style={Style.container}>
                {isLoading ? (
                    <ActivityIndicator color={iconColor} size={75} style={Style.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.idMenu.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={Style.Card}>
                                <Card.Title title={item.NAME_MENU} titleStyle={Style.CardTitle} />
                                <Card.Content>
                                    <Text style={StyleMenu.CardDescription}>{item.description}</Text>
                                    <Text style={StyleMenu.CardPrice}>${item.price}</Text>
                                    <Text style={{ color: item.available ? "green" : "red", marginTop: 5 }}>
                                        {item.available ? "Disponible" : "No disponible"}
                                    </Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={buttonBackground} textColor="black" onPress={() => console.log("EDITAR MENU")}>Editar</Button>
                                    <Button icon="trash-can" buttonColor={buttonBackground} textColor="red" onPress={() => handleOpenModalDelete(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay menu disponibles</Text>}
                    />
                )}
                <ModalAddMenu isOpen={openModalAddMenu} onDismiss={handleCloseModalAdd} categories={category}/>
                {/* <ModalEditRole isOpen={openModalEditRole} onDismiss={handleCloseModalEditRole} role={roleEdit} /> */}
                <ModalDelete isOpen={openModalDeleteMenu} onDismiss={handleCloseModalDelete} api="deleteMenu" content={"¿Are you sure you want to delete " + menuDelete?.NAME_MENU + " ?"} title="DELETE MENU MEAL" idDelete={menuDelete?.idMenu} />
            </View>
        </ImageBackground>
    );
}

export default ViewMenu;
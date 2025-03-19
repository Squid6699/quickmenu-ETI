import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { backgroundStyle } from "../../styles/BackgroundStyles";
import { ViewUsersStyles } from "../../styles/ViewUsersStyles";
import { useState } from "react";
import { CategoriesType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useCustomColors } from "../../hook/useCustomColors";
import ModalAddCategory from "../../components/ModalAddCategory";
import ModalDelete from "../../components/ModalDelete";
import ModalEditCategory from "../../components/ModalEditCategory";

const ViewCategory = () => {
    const Style = ViewUsersStyles();
    const { iconColor, buttonBackground } = useCustomColors();

    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchCategories = async () => {
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


    const { data: categories, isLoading, error, isError, refetch } = useQuery<CategoriesType[]>({
        queryKey: ["categories"],
        queryFn: fetchCategories,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const filteredData = categories?.filter(category =>
        category.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];


    const [openModalAddCategory, setOpenModalAddCategory] = useState(false);
    const [openModalEditCategory, setOpenModalEditCategory] = useState(false);
    const [categoryEdit, setCategoryEdit] = useState<CategoriesType | null>(null);
    const [openModalDeleteCategory, setOpenModalDeleteCategory] = useState(false);
    const [categoryDelete, setCategoryDelete] = useState<CategoriesType | null>(null);

    const handleOpenModalAdd = () => setOpenModalAddCategory(true);
    const handleCloseModalAdd = () => {
        setOpenModalAddCategory(false);
        refetch();
    }

    const handleOpenModalEdit = (category: CategoriesType) => {
        setOpenModalEditCategory(true);
        setCategoryEdit(category);
    }

    const handleCloseModalEdit = () => {
        setOpenModalEditCategory(false);
        setCategoryEdit(null);
        refetch();
    }

    const handleOpenModalDelete = (category: CategoriesType) => {
        setOpenModalDeleteCategory(true);
        setCategoryDelete(category);
    }

    const handleCloseModalDeleteRole = () => {
        setOpenModalDeleteCategory(false);
        setCategoryDelete(null);
        refetch();
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar categoria..."
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
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={Style.Card}>
                                <Card.Title title={item.name.toUpperCase()} titleStyle={Style.CardTitle} />
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={buttonBackground} textColor="black" onPress={() => handleOpenModalEdit(item)}>Editar</Button>
                                    <Button icon="trash-can" buttonColor={buttonBackground} textColor="red" onPress={() => handleOpenModalDelete(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                <ModalAddCategory isOpen={openModalAddCategory} onDismiss={handleCloseModalAdd} />
                <ModalEditCategory isOpen={openModalEditCategory} onDismiss={handleCloseModalEdit} category={categoryEdit} />
                <ModalDelete isOpen={openModalDeleteCategory} onDismiss={handleCloseModalDeleteRole} api="deleteCategory" content={"¿Are you sure you want to delete " + categoryDelete?.name + " ?"} title="DELETE CATEGORY" idDelete={categoryDelete?.id} />
            </View>

        </ImageBackground>
    );
}

export default ViewCategory;
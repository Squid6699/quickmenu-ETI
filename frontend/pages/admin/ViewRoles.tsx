import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { RolesType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import { ViewUsersStyles } from "../../styles/ViewUsersStyles";
import { useCustomColors } from "../../hook/useCustomColors";
import ModalAddRole from "../../components/ModalAddRole";
import ModalDelete from "../../components/ModalDelete";
import ModalEditRole from "../../components/ModalEditRole";

const ViewRoles = () => {
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android'
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;


    const fetchRoles = async () => {
        const response = await fetch(`${API_URL}/api/getRoles`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
        });

        const data = await response.json();
        if (data.success) {
            return data.data;
        } else {
            return []
        }
    };


    const { data: roles, isLoading, error, isError, refetch } = useQuery<RolesType[]>({
        queryKey: ["roles"],
        queryFn: fetchRoles,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const filteredData = roles?.filter(roles =>
        roles.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const [openModalAddRole, setOpenModalAddRole] = useState(false);
    const [openModalEditRole, setOpenModalEditRole] = useState(false);
    const [openModalDeleteRole, setOpenModalDeleteRole] = useState(false);
    const [roleEdit, setRoleEdit] = useState<RolesType | null>(null);
    const [roleDelete, setRoleDelete] = useState<RolesType | null>(null);

    const handleOpenModalAdd = () => setOpenModalAddRole(true);

    const handleCloseModalAdd = () => {
        setOpenModalAddRole(false);
        refetch();
    }

    const handleOpenModalEditRole = (role: RolesType) => {
        setRoleEdit(role);
        setOpenModalEditRole(true);
    }

    const handleCloseModalEditRole = () => {
        setOpenModalEditRole(false);
        setRoleEdit(null);
        refetch();
    }

    const handleOpenModalDeleteRole = (role: RolesType) => {
        setRoleDelete(role);
        setOpenModalDeleteRole(true);
    }

    const handleCloseModalDeleteRole = () => {
        setOpenModalDeleteRole(false);
        setRoleDelete(null);
        refetch();
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar rol..."
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
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
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
                                <Card.Content>
                                    <Text style={Style.CardContent}>
                                        <Text style={{ fontWeight: "bold" }}>PERMISOS: </Text>
                                        {Object.entries(JSON.parse(item.permissions)) // Convierte la cadena en objeto
                                            .filter(([_, value]) => value) // Filtra solo los permisos `true`
                                            .map(([key]) => key.toUpperCase()) // Convierte la clave a mayúsculas
                                            .join(", ") || "NONE"}
                                    </Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleOpenModalEditRole(item) }>Editar</Button>
                                    <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleOpenModalDeleteRole(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                <ModalAddRole isOpen={openModalAddRole} onDismiss={handleCloseModalAdd} />
                <ModalEditRole isOpen={openModalEditRole} onDismiss={handleCloseModalEditRole} role={roleEdit} />
                <ModalDelete isOpen={openModalDeleteRole} onDismiss={handleCloseModalDeleteRole} api="deleteRoles" content={"¿Are you sure you want to delete " + roleDelete?.name + " ?"} title="DELETE ROLE" idDelete={roleDelete?.id} />
            </View>
        </ImageBackground>
    );
}

export default ViewRoles;
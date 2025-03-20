import { useQuery } from "@tanstack/react-query";
import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { backgroundStyle } from "../../styles/BackgroundStyles";
import { ViewUsersStyles } from "../../styles/ViewUsersStyles";
import { useState } from "react";
import { useCustomColors } from "../../hook/useCustomColors";
import ModalAddUser from "../../components/ModalAddUser";
import ModalDelete from "../../components/ModalDelete";
import { RolesType, User } from "../../types";
import ModalEditUser from "../../components/ModalEditUser";



const ViewUsers = () => {
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android'
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchUsers = async () => {
        const response = await fetch(`${API_URL}/api/getUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    };

    const fetchRoles = async () => {
        const response = await fetch(`${API_URL}/api/getRoles`, {
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

    const { data, isLoading, isError, error, refetch } = useQuery<User[]>({
        queryKey: ['menu'],
        queryFn: fetchUsers
    });

    const { data: roles } = useQuery<RolesType[]>({
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

    const [openModalAddUser, setOpenModalAddUser] = useState(false);

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [userDelete, setUserDelete] = useState<User | null>(null);

    const [openModalEditUser, setOpenModalEditUser] = useState(false);
    const [userEdit, setUserEdit] = useState<User | null>(null);

    const handleOpenModalUser = () => {
        setOpenModalAddUser(true);
    };

    const handleCloseOpenModalUser = () => {
        setOpenModalAddUser(false);
        refetch();
    }

    const handleOpenModalEdit = (user: User) => {
        setUserEdit(user);
        setOpenModalEditUser(true);
    }

    const handleCloseOpenModalEdit = () => {
        setUserEdit(null);
        setOpenModalEditUser(false);
        refetch();
    }

    const handleOpenModalDelete = (user: User) => {
        setUserDelete(user);
        setOpenModalDelete(true);
    }

    const handleCloseOpenModalDelete = () => {
        setUserDelete(null);
        setOpenModalDelete(false);
        refetch();
    }

    const filteredData = data?.filter(user =>
        user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar usuario..."
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={handleOpenModalUser}
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
                                    <Text style={Style.CardContent}>USUARIO: {item.username.toUpperCase()}</Text>
                                    <Text style={Style.CardContent}>ROL: {item.ROL_NAME.toUpperCase()}</Text>
                                    <Text style={Style.CardContent}>PASS: {item.password}</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleOpenModalEdit(item)}>Editar</Button>
                                    <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleOpenModalDelete(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                <ModalAddUser isOpen={openModalAddUser} onDismiss={handleCloseOpenModalUser} roles={roles} />
                <ModalEditUser isOpen={openModalEditUser} onDismiss={handleCloseOpenModalEdit} user={userEdit} roles={roles} />
                <ModalDelete isOpen={openModalDelete} onDismiss={handleCloseOpenModalDelete} api="deleteUsers" content={"¿Are you sure you want to delete " + userDelete?.username + " ?"} title="DELETE USER" idDelete={userDelete?.id} />
            </View>
        </ImageBackground>

    );
}

export default ViewUsers;

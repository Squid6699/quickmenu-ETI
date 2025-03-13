import { useQuery } from "@tanstack/react-query";
import { FlatList, ImageBackground, RefreshControl, View, TextInput } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Modal, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { backgroundStyle } from "../../styles/BackgroundStyles";
import { ViewUsersStyles } from "../../styles/ViewUsersStyles";
import { useState } from "react";
import { useCustomColors } from "../../hook/useCustomColors";
import ModalAddUser from "../../components/ModalAddUser";
import { PaperProvider } from 'react-native-paper';

interface User {
    id: number;
    username: string;
    name: string;
    ROL_NAME: string;
}

const ViewUsers = () => {
    const Style = ViewUsersStyles();
    const { iconColor } = useCustomColors();
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

    const { data, isLoading, isError, error, refetch } = useQuery<User[]>({
        queryKey: ['menu'],
        queryFn: fetchUsers
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const [openModalAddUser, setOpenModalAddUser] = useState(false);

    const handleOpenModalUser = () => {
        setOpenModalAddUser(true);
    };

    const handleCloseOpenModalUser = () => {
        setOpenModalAddUser(false);
    }

    const filteredData = data?.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <PaperProvider>
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
                                    <Card.Content>
                                        <Text style={Style.CardContent}>USUARIO: {item.username.toUpperCase()}</Text>
                                        <Text style={Style.CardContent}>ROL: {item.ROL_NAME.toUpperCase()}</Text>
                                    </Card.Content>
                                    <Card.Actions>
                                        <Button icon="pencil" buttonColor="white" textColor="black" onPress={() => console.log(`Editar usuario ${item.id}`)}>Editar</Button>
                                        <Button icon="trash-can" buttonColor="white" textColor="red" onPress={() => console.log(`Eliminar usuario ${item.id}`)}>Eliminar</Button>
                                    </Card.Actions>
                                </Card>
                            )}
                            ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                        />
                    )}
                    {openModalAddUser && <ModalAddUser isOpen={openModalAddUser} onDismiss={handleCloseOpenModalUser} />}
                </View>
            </ImageBackground>
        </PaperProvider>

    );
}

export default ViewUsers;

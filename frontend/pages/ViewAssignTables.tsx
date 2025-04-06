import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AssignedTable } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../hook/useAuth";
import { ViewUsersStyles } from "../styles/ViewUsersStyles";
import { useCustomColors } from "../hook/useCustomColors";
import { useState } from "react";
import { backgroundStyle } from "../styles/BackgroundStyles";

const ViewAssignedTables = () => {
    const { user } = useAuth();
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchGetAssinedTablesAll = async () => {
        const response = await fetch(`${API_URL}/api/getAssignedTables`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    }

    const fetchGetAssignedTablesWaitress = async () => {
        const response = await fetch(`${API_URL}/api/getAssignedTablesWaitress?id=${user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
        });

        const data = await response.json();

        if (!data.success) throw new Error(data.message);
        return data.data;
    }

    const { data: assignedTablesAll, isLoading: isLoadingTableAll, error: errorTableAll, isError: isErrorTableAll, refetch: refetchTableAll } = useQuery<AssignedTable[]>({
        queryKey: ["assignedTablesAll"],
        queryFn: fetchGetAssinedTablesAll,
    });

    const { data: assignedTablesWaitress, isLoading: isLoadingTableWaitress, error: errorTableWaitress, isError: isErrorTableWaitress, refetch: refetchTableWaitress } = useQuery<AssignedTable>({
        queryKey: ["assignedTablesWaitress"],
        queryFn: fetchGetAssignedTablesWaitress,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetchTableAll();
        await refetchTableWaitress();
        setRefreshing(false);
    };

    const filteredData = assignedTablesAll?.filter(roles =>
        roles.Waitress?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar mesero..."
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <Button
                    icon="plus"
                    mode="contained"
                    onPress={() => {console.log("Agregar")}}
                    style={Style.addButton}
                >
                    Agregar
                </Button>
            </Appbar.Header>

            <View style={Style.container}>
                {isLoadingTableAll ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : isErrorTableAll ? (
                    <Text style={{ color: 'red' }}>Error: {errorTableAll.message}</Text>
                ) : (
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.idWaitress.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={Style.Card}>
                                <Card.Title title={item.Waitress.toUpperCase()} titleStyle={Style.CardTitle} />
                                <Card.Content>
                                    <Text style={Style.CardContent}>
                                        <Text style={{ fontWeight: "bold" }}>MESAS: </Text>
                                        {/* {Object.entries(JSON.parse(item.permissions)) // Convierte la cadena en objeto
                                            .filter(([_, value]) => value) // Filtra solo los permisos `true`
                                            .map(([key]) => key.toUpperCase()) // Convierte la clave a mayúsculas
                                            .join(", ") || "NONE"} */}
                                    </Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => console.log(assignedTablesAll)}>Editar</Button>
                                    {/* <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleOpenModalDeleteRole(item)}>Eliminar</Button> */}
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                {/* <ModalAddRole isOpen={openModalAddRole} onDismiss={handleCloseModalAdd} /> */}
                {/* <ModalEditRole isOpen={openModalEditRole} onDismiss={handleCloseModalEditRole} role={roleEdit} /> */}
                {/* <ModalDelete isOpen={openModalDeleteRole} onDismiss={handleCloseModalDeleteRole} api="deleteRoles" content={"¿Are you sure you want to delete " + roleDelete?.name + " ?"} title="DELETE ROLE" idDelete={roleDelete?.id} /> */}
            </View>
        </ImageBackground>
    );
}

export default ViewAssignedTables;
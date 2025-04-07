import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AssignedTable } from "../types";
import { useQuery } from "@tanstack/react-query";
import { ViewUsersStyles } from "../styles/ViewUsersStyles";
import { useCustomColors } from "../hook/useCustomColors";
import { useState } from "react";
import { backgroundStyle } from "../styles/BackgroundStyles";
import ModalDelete from "../components/ModalDelete";

const ViewAssignedTables = () => {
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

    const { data: assignedTablesAll, isLoading: isLoadingTableAll, error: errorTableAll, isError: isErrorTableAll, refetch: refetchTableAll } = useQuery<AssignedTable[]>({
        queryKey: ["assignedTablesAll"],
        queryFn: fetchGetAssinedTablesAll,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetchTableAll();
        setRefreshing(false);
    };

    const filteredData = assignedTablesAll?.filter(roles =>
        roles.Waitress?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [assingDelete, setAssingDelete] = useState<AssignedTable | null>(null);

    const handleOpenModalDelete = (table: AssignedTable) => {
        setAssingDelete(table);
        setOpenModalDelete(true);
    };

    const handleCloseModalDelete = () => {
        setOpenModalDelete(false);
        setAssingDelete(null);
        refetchTableAll();
    };

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
                    onPress={() => { console.log("Agregar") }}
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
                                        <Text style={{ fontWeight: "bold" }}>{"MESAS: \n"} </Text>
                                        {JSON.parse(item.Tables).map((table: any, index: number) => (
                                            <Text key={table.id}>
                                                {table.table}
                                                {index !== JSON.parse(item.Tables).length - 1 ? '\n ' : ''}
                                            </Text>
                                        ))}
                                    </Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => console.log(item)}>Editar</Button>
                                    <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleOpenModalDelete(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                {/* <ModalAddRole isOpen={openModalAddRole} onDismiss={handleCloseModalAdd} /> */}
                {/* <ModalEditRole isOpen={openModalEditRole} onDismiss={handleCloseModalEditRole} role={roleEdit} /> */}
                <ModalDelete isOpen={openModalDelete} onDismiss={handleCloseModalDelete} api="assignedTableDelete" content={"¿Are you sure you want to delete " + assingDelete?.Waitress + " ?"} title="ASSIGN DELETE" idDelete={assingDelete?.ids} />
            </View>
        </ImageBackground>
    );
}

export default ViewAssignedTables;
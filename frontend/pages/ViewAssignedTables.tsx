//NO TERMINADO

import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar, Chip } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AssignedTable, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { ViewUsersStyles } from "../styles/ViewUsersStyles";
import { useCustomColors } from "../hook/useCustomColors";
import { useState } from "react";
import { backgroundStyle } from "../styles/BackgroundStyles";
import ModalAddAssignTable from "../components/ModalAddAssignTable";
import ModalDeleteAssignTable from "../components/ModalDeleteAssignTable";
import { useAuth } from "../hook/useAuth";

const ViewAssignedTables = () => {
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    const { user } = useAuth();

    const fetchGetAssinedTables = async () => {
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

    const { data, isLoading, error, isError, refetch } = useQuery<AssignedTable[]>({
        queryKey: ["assignedTables"],
        queryFn: fetchGetAssinedTables,
    });

    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const filteredData = data?.filter(d =>
        d.Waitress?.toLowerCase().includes(searchQuery.toLowerCase())
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
        refetch();
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={backgroundStyle.background}>
            <Appbar.Header style={Style.header}>
                <Searchbar
                    style={Style.searchInput}
                    placeholder="Buscar mesa..."
                    placeholderTextColor="gray"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </Appbar.Header>


            <View style={Style.container}>
                {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : data?.length == 0 ? (
                    <Text>No tienes asignaciones.</Text>
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
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
                                        {JSON.parse(item.Tables).map((table: any, index: number) => (
                                            <Chip
                                                key={table.id}
                                                icon="tablet"
                                                onPress={() => console.log("ORDEN MESA" + table.id)}
                                            >{table.table}
                                            </Chip >
                                        ))}
                                    </Text>
                                </Card.Content>
                                <Card.Actions>
                                    {/* <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => console.log(item)}>Editar</Button> */}
                                    <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleOpenModalDelete(item)}>Eliminar</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
                {/* <ModalDeleteAssignTable isOpen={openModalDelete} onDismiss={handleCloseModalDelete} assingDelete={assingDelete} /> */}
            </View>
        </ImageBackground>
    );
}

export default ViewAssignedTables;
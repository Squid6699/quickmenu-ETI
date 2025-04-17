import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { AssignedTable, RootStackParamList, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { ViewUsersStyles } from "../styles/ViewUsersStyles";
import { useCustomColors } from "../hook/useCustomColors";
import { useState } from "react";
import { backgroundStyle } from "../styles/BackgroundStyles";
import { useAuth } from "../hook/useAuth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { handleViewOrderTable } from "../navigationsHandle";

const ViewAssignedTables = () => {
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    const { user } = useAuth();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

    const mesasPlanas = data?.flatMap(item => {
        try {
            return JSON.parse(item.Tables || '[]')
                .filter((mesa: any) =>
                    mesa.table.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((mesa: any) => ({
                    ...mesa
                }));
        } catch (e) {
            return [];
        }
    }) || [];

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
                        data={mesasPlanas}
                        keyExtractor={(item) => item.id.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={Style.Card}>
                                <Card.Title title={item.table.toUpperCase()} titleStyle={Style.CardTitle} />

                                <Card.Actions>
                                    <Button icon="eye" buttonColor={colors.buttonBackground} textColor="green" onPress={() => handleViewOrderTable(navigation, item)}>Ver orden</Button>
                                </Card.Actions>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
            </View>
        </ImageBackground>
    );
}

export default ViewAssignedTables;
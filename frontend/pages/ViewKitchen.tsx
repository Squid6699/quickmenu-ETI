import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import { OrdersDetails } from '../types';
import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { Text, Card, Button, ActivityIndicator, Appbar, Searchbar } from "react-native-paper";
import { backgroundStyle } from '../styles/BackgroundStyles';
import { ViewUsersStyles } from '../styles/ViewUsersStyles';
import { useCustomColors } from '../hook/useCustomColors';
import { useState } from 'react';
import { OrderStyles } from '../styles/OrderStyles';

const ViewKitchen = () => {
    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    const Style = ViewUsersStyles();
    const { colors } = useCustomColors();
    const StyleCard = OrderStyles();

    const fetchGetOrdersKitchen = async () => {
        const response = await fetch(`${API_URL}/api/getOrdersKitchen`, {
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
    }

    const { data, isLoading, error, isError, refetch } = useQuery<OrdersDetails[]>({
        queryKey: ["OrderesKitchen"],
        queryFn: fetchGetOrdersKitchen,
    });

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };


    const handleStatusOrder = async (id: string, status: string) => {
        const response = await fetch(`${API_URL}/api/updateOrderKitchen`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend",
            },
            body: JSON.stringify({
                id: id,
                status: status
            })
        });

        const data = await response.json();

        if (data.success) {
            refetch();
        } else {
            // console.log(data.message);
        }

    }

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={backgroundStyle.background}>
            <View style={Style.container}>
                {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : data?.length == 0 ? (
                    <Text style={Style.textCenter}>No hay mesas.</Text>
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.id}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={Style.Card}>
                                <Card.Title title={item.menuName.toUpperCase()} titleStyle={Style.CardTitle} />

                                <Card.Content>
                                    <Text style={StyleCard.CardDescription}>{item.menuDescription}</Text>
                                    <Text style={StyleCard.CardDescription}>Comentario: {item.comments ? item.comments : "Sin comentario"}</Text>
                                    <Text style={StyleCard.CardDescription}>Cantidad: {item.quantity}</Text>
                                    <Text style={StyleCard.CardDescription}>{item.table}</Text>
                                    <Text style={StyleCard.CardDescription}>Estado: {item.status}</Text>
                                </Card.Content>

                                <Card.Actions>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                        <Button buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleStatusOrder(item.id, "Pendiente")}>Pendiente</Button>
                                        <Button buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleStatusOrder(item.id, "En preparacion")}>En preparacion</Button>
                                        <Button buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleStatusOrder(item.id, "Listo")}>Listo</Button>
                                    </View>
                                </Card.Actions>

                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay usuarios disponibles</Text>}
                    />
                )}
            </View>
        </ImageBackground>
    )
}

export default ViewKitchen;


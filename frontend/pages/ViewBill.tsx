// NO TERMINADO
import { ImageBackground, View } from "react-native";
import { ViewUsersStyles } from "../styles/ViewUsersStyles";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { backgroundStyle } from "../styles/BackgroundStyles";
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { useQuery } from "@tanstack/react-query";
import { OrdersType } from "../types";
import { useState } from "react";
import { useCustomColors } from "../hook/useCustomColors";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { OrderStyles } from "../styles/OrderStyles";
import { useAuth } from "../hook/useAuth";
import ButtonsOptions from "../components/ButtonOptions";

const ViewBill = () => {
    const Style = ViewUsersStyles();
    const StyleCard = OrderStyles();

    const API_URL = Platform.OS === 'android' ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    const { colors } = useCustomColors();
    const { user } = useAuth();

    const fetchGetOrdersReceived = async () => {
        const response = await fetch(`${API_URL}/api/getOrdersReceived?q=${user?.id}`, {
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

    const { data, isLoading, error, isError, refetch } = useQuery<OrdersType[]>({
        queryKey: ["ordersReceived"],
        queryFn: fetchGetOrdersReceived,
    });

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={backgroundStyle.background}>
            <View style={Style.container}>
                {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : data?.length == 0 ? (
                    <Text style={Style.textCenter}>No hay ordenes para esta mesa.</Text>
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.idOrderDetails.toString()}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                        renderItem={({ item }) => (
                            <Card style={StyleCard.Card}>
                                <Card.Title title={item.menuName} titleStyle={StyleCard.CardTitle} />
                                <Card.Content>
                                    <Text style={StyleCard.CardDescription}>{item.menuDescription}</Text>
                                    <Text style={StyleCard.CardDescription}>Cantidad: {item.menuQuantity}</Text>
                                    <Text style={StyleCard.CardDescription}>Comentario: {item.FOOD_COMMENTS ? item.FOOD_COMMENTS : "Sin comentario"}</Text>
                                    <Text style={StyleCard.CardPrice}>${item.FOOD_TOTAL}</Text>
                                    <Text style={StyleCard.CardPrice}>Total: ${item.FOOD_TOTAL * item.menuQuantity}</Text>
                                    <Text style={StyleCard.CardPrice}>Status: {item.FOOD_STATUS}</Text>
                                </Card.Content>
                            </Card>
                        )}
                        ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay ordenes disponibles</Text>}
                    />
                )}
            </View>
            {
                data?.length != 0 && (
                    <View style={{ alignSelf: "center", marginBottom: 50 }}>
                        <ButtonsOptions title={"Cuenta junta"} description={"Pagar cuenta junta"} iconName={"document-outline"} onPress={() => alert("Cuenta junta")} />
                        <ButtonsOptions title={"Cuenta separada"} description={"Pagar cuenta por separado"} iconName={"document-text-outline"} onPress={() => alert("Cuenta separada")} />
                    </View>
                )
            }


        </ImageBackground>
    );
}

export default ViewBill;
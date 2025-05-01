// NO TERMINADO
//AQUI VAN SE VAN A VER LAS ORDENES DE LAS MESAS ASIGNADAS CUANDO LE DAS CLIC EN VER ORDEN DESDE ViewAssignedTables.tsx

import { ImageBackground, View } from "react-native";
import { ActivityIndicator, Button, Card, Text } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { OrdersType, RootStackParamList } from "../types";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";
import { backgroundStyle } from "../styles/BackgroundStyles";
import { OrderStyles } from "../styles/OrderStyles";
import { HomeStyles } from "../styles/HomeStyles";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { useState } from "react";
import { useCustomColors } from "../hook/useCustomColors";
import { useAuth } from "../hook/useAuth";

type ViewOrderTableRouteProp = RouteProp<RootStackParamList, "Ver Orden de Mesa Asignada">;

const ViewOrderTable = () => {
    const route = useRoute<ViewOrderTableRouteProp>();
    const { mesa } = route.params;
    const Style = OrderStyles();
    const StyleHome = HomeStyles();
    const { colors } = useCustomColors();
    const { permissions } = useAuth();
    const permission = permissions ? JSON.parse(permissions) : null;


    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchOrders = async () => {
        const response = await fetch(`${API_URL}/api/getOrders?q=${mesa?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend"
            },
        });

        const data = await response.json();
        if (data.success) {
            return data.data;
        } else {
            return []
        }

    };

    const [refreshing, setRefreshing] = useState(false);


    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleOpenModalEdit = (item: OrdersType) => {
        console.log(item, "ORDEN A EDITAR");
    };

    const { data: OrdersDB, isLoading, isError, error, refetch } = useQuery<OrdersType[]>({ queryKey: ["ordersDB"], queryFn: fetchOrders });

    return (
        <ImageBackground source={require("../assets/background.jpg")} style={backgroundStyle.background}>
            <View style={Style.container}>
                {
                    isLoading ? (
                        <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                    ) : isError ? (
                        <Text style={{ color: colors.colorError }}>Error: {error.message}</Text>
                    ) : (OrdersDB ?? []).length > 0 ? (
                        <>
                            <Text style={StyleHome.title}>ORDENES</Text>
                            <FlatList
                                data={OrdersDB}
                                keyExtractor={(item) => item.idOrderDetails.toString()}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                                renderItem={({ item }) => (
                                    <Card style={Style.Card}>
                                        <Card.Title title={item.menuName} titleStyle={Style.CardTitle} />
                                        <Card.Content>
                                            <Text style={Style.CardDescription}>{item.menuDescription}</Text>
                                            <Text style={Style.CardDescription}>Cantidad: {item.menuQuantity}</Text>
                                            <Text style={Style.CardDescription}>Comentario: {item.FOOD_COMMENTS ? item.FOOD_COMMENTS : "Sin comentario"}</Text>
                                            <Text style={Style.CardPrice}>${item.FOOD_TOTAL}</Text>
                                            <Text style={Style.CardPrice}>Total: ${item.FOOD_TOTAL * item.menuQuantity}</Text>
                                            <Text style={Style.CardPrice}>Status: {item.FOOD_STATUS}</Text>
                                        </Card.Content>


                                        {(permission && (permission["Actualizar Ordenes"] || permission["admin"])) && (
                                            <Card.Actions>
                                                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                                    <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleOpenModalEdit(item)}>Editar</Button>
                                                </View>
                                            </Card.Actions>
                                        )}

                                    </Card>
                                )}
                                ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay ordenes disponibles</Text>}
                            />
                        </>
                    ) : (
                        <Text style={{ color: colors.iconColor }}>No hay órdenes para esta mesa.</Text>
                    )
                }
            </View>
        </ImageBackground>
    );
};

export default ViewOrderTable;
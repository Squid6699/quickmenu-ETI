// NO TERMINADO
//AQUI VAN SE VAN A VER LAS ORDENES DE LAS MESAS ASIGNADAS CUANDO LE DAS CLIC EN VER ORDEN DESDE ViewAssignedTables.tsx

import { View } from "react-native";
import { Text } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { OrdersType, RootStackParamList } from "../types";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";

type ViewOrderTableRouteProp = RouteProp<RootStackParamList, "Ver Orden de Mesa Asignada">;

const ViewOrderTable = () => {
    const route = useRoute<ViewOrderTableRouteProp>();
    const { mesa } = route.params;
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

    const { data: OrdersDB, isLoading, isError, error, refetch: refetchOrders } = useQuery<OrdersType[]>({ queryKey: ["ordersDB"], queryFn: fetchOrders });
    console.log(OrdersDB, "ORDENES DE LA MESA ASIGNADA");
    return (
        <View>
            <Text>{mesa.id}</Text>
            <Text>{mesa.table}</Text>
        </View>
    );
};

export default ViewOrderTable;
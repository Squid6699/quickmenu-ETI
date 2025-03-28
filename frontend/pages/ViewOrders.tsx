import { useState, useEffect } from "react";
import { View, ImageBackground, RefreshControl, Alert } from "react-native";
import { ActivityIndicator, Card, Text, List, Button, Appbar } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCustomColors } from "../hook/useCustomColors";
import { backgroundStyle } from "../styles/BackgroundStyles";
import { OrderStyles } from "../styles/OrderStyles";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { useQuery } from "@tanstack/react-query";
import { confirmOrder, OrdersType } from "../types";
import { HomeStyles } from "../styles/HomeStyles";
import { useAuth } from "../hook/useAuth";
import ModalEditOrder from "../components/ModalEditOrder";
import ButtonsOptions from "../components/ButtonOptions";

const ViewOrders = () => {
    const { user } = useAuth();
    const Style = OrderStyles();
    const StyleHome = HomeStyles();
    const { colors } = useCustomColors();
    const [recipes, setRecipes] = useState<confirmOrder[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingViewOrders, setLoadingViewOrders] = useState(false);
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchOrders = async () => {
        const response = await fetch(`${API_URL}/api/getOrders?q=${user?.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-frontend-header": "frontend"
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    };

    const { data: OrdersDB, isLoading, isError, error, refetch } = useQuery({ queryKey: ["ordersDB"], queryFn: fetchOrders });

    const fetchRecipes = async () => {
        setLoadingViewOrders(true);
        const storedRecipes = await AsyncStorage.getItem("orders");
        if (storedRecipes) {
            setRecipes(JSON.parse(storedRecipes));
        }
        setLoadingViewOrders(false);
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchRecipes();
        setRefreshing(false);
    };

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [confirmOrderSelected, setConfirmOrderSelected] = useState<confirmOrder | null>(null);

    const handleOpenModalEdit = (order: confirmOrder) => {
        setConfirmOrderSelected(order);
        setOpenModalEdit(true);
    };

    const handleCloseModalEdit = () => {
        setConfirmOrderSelected(null);
        setOpenModalEdit(false);
        fetchRecipes();
    }

    const handleDeleteConfirmOrder = async (id: string) => {
        const newRecipes = recipes.filter((recipe) => recipe.id !== id);
        setRecipes(newRecipes);
        await AsyncStorage.setItem("orders", JSON.stringify(newRecipes));
    }


    return (
        <ImageBackground source={require("../assets/background.jpg")} style={backgroundStyle.background}>
            <View style={Style.container}>

                {/* {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: "red" }}>Error: {error.message}</Text>
                ) : (
                    <>
                        <Text style={Style.CardTitle}>ORDENES</Text> */}
                {/* FALTA AGREGAR NUMERO DE MESA Y MESERO ASIGNADO */}
                {/* <FlatList
                            data={OrdersDB}
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
                                        <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => console.log("PERMISOS PARA EDITAR")}>Editar</Button>
                                        <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => console.log("PERMISOS PARA EDITAR")}>Eliminar</Button>
                                    </Card.Actions>
                                </Card>
                            )}
                            ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay ordenes disponibles</Text>}
                        /> */}
                {/* </>

                )} */}

                {/* ORDENES EN LOCAL */}
                {recipes.length === 0 && !loadingViewOrders ? (
                    <View style={StyleHome.titleContainer}>
                        <Text style={StyleHome.title}>SIN ORDENES POR CONFIRMAR</Text>
                    </View>
                ) :
                    <>
                        <View style={StyleHome.titleContainer}>
                            <Text style={StyleHome.title}>ORDENES SIN CONFIRMAR</Text>
                        </View>
                        <FlatList
                            data={recipes}
                            keyExtractor={(item) => item.id.toString()}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                            renderItem={({ item }) => (
                                <Card style={Style.Card}>
                                    <Card.Title title={item.order?.NAME_MENU} titleStyle={Style.CardTitle} />
                                    <Card.Content>
                                        <Text style={Style.CardPrice}>{item.order?.CATEGORY_NAME}</Text>
                                        <Text style={Style.CardDescription}>{item.order?.description}</Text>
                                        <Text style={Style.CardDescription}>Cantidad: {item.quantity}</Text>
                                        <Text style={Style.CardDescription}>Comentario: {item.comment ? item.comment : "Sin comentario"}</Text>
                                        <Text style={Style.CardPrice}>${item.order?.price}</Text>
                                    </Card.Content>
                                    <Card.Actions>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                                            <Button icon="pencil" buttonColor={colors.buttonBackground} textColor="black" onPress={() => handleOpenModalEdit(item)}>Editar</Button>
                                            <Button icon="trash-can" buttonColor={colors.buttonBackground} textColor="red" onPress={() => handleDeleteConfirmOrder(item.id)}>Eliminar</Button>
                                        </View>
                                    </Card.Actions>
                                </Card>
                            )}

                            ListEmptyComponent={() => <Text style={{ textAlign: "center", marginTop: 20 }}>No hay ordenes disponibles</Text>}
                        />
                        <View style={{ alignSelf: "center" }}>
                            <ButtonsOptions title={"Confirmar Orden"} description={"Confirmar orden"} iconName={"checkmark-outline"} onPress={() => console.log("ORDEN CONFIRMADA")} />
                        </View>

                    </>
                }

            </View>
            <ModalEditOrder isOpen={openModalEdit} onDismiss={handleCloseModalEdit} order={confirmOrderSelected} />
        </ImageBackground>
    );
};

export default ViewOrders;

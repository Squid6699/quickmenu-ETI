import { useState } from "react";
import { View, ImageBackground, RefreshControl } from "react-native";
import { ActivityIndicator, Card, Text, List, Button } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";
import { FlatList } from "react-native-gesture-handler";
import { Platform } from "react-native";
import { useCustomColors } from "../hook/useCustomColors";
import { backgroundStyle } from "../styles/BackgroundStyles";
import { MenuType, RootStackParamList } from "../types";
import { OrderStyles } from "../styles/OrderStyles";
import ButtonsOptions from "../components/ButtonOptions";
import ModalAddOrder from "../components/ModalAddOrder";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { handlePressViewOrders } from "../navigationsHandle";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Order = () => {
    const Style = OrderStyles();
    const { colors } = useCustomColors();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchMenu = async () => {
        const response = await fetch(`${API_URL}/api/getMenu`, {
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

    const { data, isLoading, isError, error, refetch } = useQuery({ queryKey: ["menu"], queryFn: fetchMenu });
    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const renderItem = ({ item }: { item: MenuType }) => (
        <Card style={Style.Card}>
            <Card.Title title={item.NAME_MENU} titleStyle={Style.CardTitle} />
            <Card.Content>
                <Text style={Style.CardDescription}>{item.description}</Text>
                <Text style={Style.CardPrice}>${item.price}</Text>
                <Text style={{ color: item.available ? "green" : "red", marginTop: 5 }}>
                    {item.available ? "Disponible" : "No disponible"}
                </Text>
                <Button disabled={item.available ? false : true} onPress={() => handleOpenModalOrder(item)}>Ordenar</Button>
            </Card.Content>
        </Card>
    );

    const [openModalOrder, setOpenModalOrder] = useState(false);
    const [order, setOrder] = useState<MenuType | null>();

    const handleOpenModalOrder = (order: MenuType) => {
        setOrder(order)
        setOpenModalOrder(true);
    }

    const handleCloseModalOrder = () => {
        setOrder(null)
        setOpenModalOrder(false);
    }

    const handleViewOrder = () => {
        // await AsyncStorage.removeItem("orders");
        handlePressViewOrders(navigation);
    }

    return (
        <ImageBackground source={require("../assets/background.jpg")} style={backgroundStyle.background}>
            <View style={Style.container}>
                <View style={{ alignSelf: "center" }}>
                    <ButtonsOptions title={"Ver orden"} description={"Visualiza tu orden y su estado"} iconName={"fast-food-outline"} onPress={() => handleViewOrder()} />
                </View>

                {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: "red" }}>Error: {error.message}</Text>
                ) : (
                    <List.Section style={{ flex: 1 }}>
                        <FlatList
                            data={Array.from(new Set((data as { CATEGORY_NAME: string }[])?.map(item => item.CATEGORY_NAME)))}
                            keyExtractor={(category: string) => category}
                            renderItem={({ item: category }) => (
                                <List.Accordion key={category} title={category} style={{ backgroundColor: colors.backgroundCard }}>
                                    <FlatList
                                        data={data?.filter((item: MenuType) => item.CATEGORY_NAME === category)}
                                        keyExtractor={(item: MenuType) => item.idMenu?.toString()}
                                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
                                        renderItem={renderItem}
                                        style={{ flexGrow: 1 }}
                                    />
                                </List.Accordion>
                            )}
                        />
                    </List.Section>
                )}
            </View>
            <ModalAddOrder isOpen={openModalOrder} onDismiss={handleCloseModalOrder} menu={order} />
        </ImageBackground>
    );
};

export default Order;

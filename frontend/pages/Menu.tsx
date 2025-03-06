import { useState, useEffect } from "react";
import { View, ImageBackground, RefreshControl, Dimensions } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useQuery } from '@tanstack/react-query';
import Constants from 'expo-constants';
import { FlatList } from "react-native-gesture-handler";

import { MenuType } from "../types";
import { MenuStyles } from "../styles/MenuStyles";
import { backgroundStyle } from "../styles/BackgroundStyles";
import { backgroundColor, headerColor, iconColor } from "../styles/Colors";

const initialLayout = { width: Dimensions.get('window').width };

const Menu = () => {
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";

    const fetchMenu = async (): Promise<MenuType[]> => {
        const response = await fetch(`${API_URL}/api/getMenu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    };

    const { data, isLoading, isError, error, refetch } = useQuery<MenuType[]>({
        queryKey: ['menu'],
        queryFn: fetchMenu
    });

    const [refreshing, setRefreshing] = useState(false);
    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const renderMenuList = (filter: string) => (
        <FlatList
            data={data?.filter((item: MenuType) => filter === "Todo" || item.CATEGORY_NAME === filter)}
            keyExtractor={(item: MenuType) => item.idMenu.toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
            renderItem={({ item }) => (
                <Card style={MenuStyles.Card}>
                    <Card.Title title={item.NAME_MENU} titleStyle={MenuStyles.CardTitle} />
                    <Card.Content>
                        <Text style={MenuStyles.CardDescription}>{item.description}</Text>
                        <Text style={MenuStyles.CardPrice}>${item.price}</Text>
                        <Text style={{ color: item.available ? "green" : "red", marginTop: 5 }}>
                            {item.available ? "Disponible" : "No disponible"}
                        </Text>
                    </Card.Content>
                </Card>
            )}
        />
    );

    // Estado para manejar las rutas dinámicamente
    const [routes, setRoutes] = useState<{ key: string; title: string }[]>([{ key: 'todo', title: 'Todo' }]);

    useEffect(() => {
        if (data) {
            const categories = Array.from(new Set(data.map((item: MenuType) => item.CATEGORY_NAME)));
            const routesArray = categories.map((category) => ({
                key: category.toLowerCase(),
                title: category
            }));
            setRoutes([{ key: 'todo', title: 'Todo' }, ...routesArray]);
        }
    }, [data]);

    // Configurar las vistas de cada pestaña
    const renderScene = SceneMap(
        routes.reduce((acc, route) => {
            acc[route.key] = () => renderMenuList(route.title);
            return acc;
        }, {} as Record<string, () => JSX.Element>)
    );

    // Estado para controlar la pestaña activa
    const [index, setIndex] = useState(0);

    return (
        <ImageBackground source={require('../assets/background.jpg')} style={backgroundStyle.background}>
            <View style={MenuStyles.container}>
                {isLoading ? (
                    <ActivityIndicator color={iconColor} size={75} style={MenuStyles.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={props => (
                            <TabBar {...props} indicatorStyle={{ backgroundColor: backgroundColor }} style={{ backgroundColor: headerColor }} />
                        )}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default Menu;

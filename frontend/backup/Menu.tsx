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
import { Platform } from 'react-native';
import { useCustomColors } from "../hook/useCustomColors";

const initialLayout = { width: Dimensions.get('window').width };

const Menu = () => {
    const Style = MenuStyles();
    const { colors } = useCustomColors();
    const API_URL = Platform.OS === 'android'
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchMenu = async (): Promise<MenuType[]> => {
        const response = await fetch(`${API_URL}/api/getMenu`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
        });

        const data = await response.json();
        if (data.success) {
            return data.data;
        } else {
            return []
        }
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
            keyExtractor={(item: MenuType) => item.idMenu ? item.idMenu.toString() : Math.random().toString()}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />}
            renderItem={({ item }) => (
                <Card style={Style.Card}>
                    <Card.Title title={item.NAME_MENU} titleStyle={Style.CardTitle} />
                    <Card.Content>
                        <Text style={Style.CardDescription}>{item.description}</Text>
                        <Text style={Style.CardPrice}>${item.price}</Text>
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
            const categories = Array.from(new Set(
                data
                    .map((item: MenuType) => item.CATEGORY_NAME)
                    .filter((category): category is string => typeof category === 'string')
            ));

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
            <View style={Style.container}>
                {isLoading ? (
                    <ActivityIndicator color={colors.iconColor} size={75} style={Style.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <TabView
                        navigationState={{ index, routes }}
                        renderScene={renderScene}
                        onIndexChange={setIndex}
                        initialLayout={initialLayout}
                        renderTabBar={props => (
                            <TabBar {...props} indicatorStyle={{ backgroundColor: colors.backgroundColor }} style={{ backgroundColor: colors.headerColor }} />
                        )}
                    />
                )}
            </View>
        </ImageBackground>
    );
};

export default Menu;

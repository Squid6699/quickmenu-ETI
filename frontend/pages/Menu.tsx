import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { style } from "../App";
import Constants from 'expo-constants';
import { useState } from "react";
import { MenuType } from "../types";
import { MenuStyles } from "../styles/MenuStyles";
import { iconColor } from "../styles/Colors";
import { useQuery } from '@tanstack/react-query';
import { backgroundStyle } from "../styles/BackgroundStyles";

const Menu = () => {
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";
    
    const fetchMenu = async () => {
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

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: fetchMenu
    });

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={backgroundStyle.background}
        >
            <View style={MenuStyles.container}>
                {isLoading ? (
                    <ActivityIndicator color={iconColor} size={75} style={MenuStyles.activityIndicator} />
                ) : isError ? (
                    <Text style={{ color: 'red' }}>Error: {error.message}</Text>
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={(item: MenuType) => item.id.toString()}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["red"]} />
                        }
                        renderItem={({ item }) => (
                            <Card style={MenuStyles.Card}>
                                <Card.Title title={item.name} titleStyle={MenuStyles.CardTitle} />
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
                )}
            </View>
        </ImageBackground>
    );
};

export default Menu;

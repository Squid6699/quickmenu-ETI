import { FlatList, ImageBackground, RefreshControl, View } from "react-native";
import { ActivityIndicator, Card, Text } from "react-native-paper";
import { style } from "../App";
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { MenuType } from "../types";
import { MenuStyles } from "../styles/MenuStyles";
import { iconColor } from "../styles/Colors";

const Menu = () => {
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";
    const [loading, setLoading] = useState(false);
    const [menu, setMenu] = useState([]);

    const getMenu = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/getMenu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-frontend-header': 'frontend'
                },
            });

            const data = await response.json();

            if (data.success) {
                setMenu(data.data);
                setLoading(false);
            } else {
                alert(data.message);
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMenu();
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = async () => {
        setRefreshing(true);
        await getMenu();
        setRefreshing(false);
    };

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={style.background}
        >
            <View style={ MenuStyles.container }>
                {loading ? (
                    <ActivityIndicator color={iconColor} size={75} style= {MenuStyles.activityIndicator} />
                ) : (
                    <FlatList
                        data={menu}
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
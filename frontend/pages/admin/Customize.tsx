import { ScrollView, View } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useCustomColors } from "../../hook/useCustomColors";
import { useState } from "react";
import ColorPicker from 'react-native-wheel-color-picker';
import { useQuery } from "@tanstack/react-query";
import { CustomizeType } from "../../types";
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const Customize = () => {
    const API_URL = Platform.OS === 'android' 
    ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID 
    : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [selectedColor, setSelectedColor] = useState<string>("#efc451");
    const [colors, setColors] = useState({
        backgroundColor: "#efc451",
        textColor: "#0a0909",
        iconColor: "#fff",
        colorError: "#ff0000",
        colorSuccess: "#00ff00",
        headerColor: "#171717",
        backgroundCard: "rgba(239, 196, 81, 1.0)"
    });

    const handleColorChange = (key: string, value: string) => {
        setColors({ ...colors, [key]: value });
    };

    const { backgroundColor, backgroundCard, textColor, colorSuccess, colorError } = useCustomColors();

    const fetchCustomize = async (): Promise<CustomizeType[]> => {
        const response = await fetch(`${API_URL}/api/getCustomize`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.customize;
    };

    const { data } = useQuery<CustomizeType[]>({
        queryKey: ['customizeColor'],
        queryFn: fetchCustomize
    });

    alert(data)

    return (
        <ScrollView style={{ flex: 1, backgroundColor: backgroundColor, padding: 10 }}>
            <Card style={{ backgroundColor: backgroundCard, padding: 10 }}>
                <Text style={{ color: textColor, fontSize: 20, marginBottom: 10 }}>Vista Previa</Text>
                <Text style={{ color: colorSuccess }}>Mensaje de Éxito</Text>
                <Text style={{ color: colorError }}>Mensaje de Error</Text>
            </Card>

            {Object.keys(colors).map((key) => (
                <View key={key} style={{ marginVertical: 10 }}>
                    <Text>{key}</Text>
                    <Button mode="contained" onPress={() => setSelectedColor(colors[key])}>
                        Seleccionar Color
                    </Button>
                    <ColorPicker
                        color={colors[key]}
                        onColorChangeComplete={(color) => handleColorChange(key, color)}
                        style={{ height: 200 }}
                    />
                </View>
            ))}
        </ScrollView>
    );
}

export default Customize;

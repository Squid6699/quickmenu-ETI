import { useEffect, useState } from "react";
import Constants from 'expo-constants';
import { CustomizeType } from "../types";
import { useQuery } from "@tanstack/react-query";
import { Platform } from 'react-native';

export const useCustomColors = () => {
    const API_URL = Platform.OS === 'android' 
    ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID 
    : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [colors, setColors] = useState({
        backgroundColor: "#efc451",
        textColor: "#0a0909",
        iconColor: "#fff",
        colorError: "#ff0000",
        colorSuccess: "#00ff00",
        headerColor: "#171717",
        backgroundCard: "rgba(239, 196, 81, 1.0)",
        buttonBackground: "#ffff",
    });

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

    const { data, refetch } = useQuery<CustomizeType[]>({
        queryKey: ['customizeColor'],
        queryFn: fetchCustomize
    });

    const updateCustomize = async (id:string | undefined, color: string) => {
        const response = await fetch(`${API_URL}/api/updateCustomize`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
            body: JSON.stringify({ id: id, color: color })
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        refetch();
    }

    useEffect(() => {
        if (data) {
            const newColors = data.reduce((acc, item) => {
                acc[item.name] = item.color;
                return acc;
            }, {} as Record<string, string>);

            setColors(prev => ({ ...prev, ...newColors }));
        }
    }, [data]);

    return {colors, data, updateCustomize};
};

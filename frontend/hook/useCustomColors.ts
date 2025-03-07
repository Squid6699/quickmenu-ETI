import { useEffect, useState } from "react";
import Constants from 'expo-constants';
import { Customize } from "../types";
import { useQuery } from "@tanstack/react-query";

export const useCustomColors = () => {
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";

    const [colors, setColors] = useState({
        backgroundColor: "#efc451",
        textColor: "#0a0909",
        iconColor: "#fff",
        colorError: "#ff0000",
        colorSuccess: "#00ff00",
        headerColor: "#171717",
        backgroundCard: "rgba(239, 196, 81, 1.0)",
    });

    const fetchCustomize = async (): Promise<Customize[]> => {
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

    const { data } = useQuery<Customize[]>({
        queryKey: ['customizeColor'],
        queryFn: fetchCustomize
    });

    useEffect(() => {
        if (data) {
            const newColors = data.reduce((acc, item) => {
                acc[item.name] = item.color;
                return acc;
            }, {} as Record<string, string>);

            setColors(prev => ({ ...prev, ...newColors }));
        }
    }, [data]);

    return colors;
};

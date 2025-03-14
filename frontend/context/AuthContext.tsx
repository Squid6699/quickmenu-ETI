import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Definir los tipos de datos que manejaremos en el contexto
interface User {
    name: string;
    username: string;
    roleId: number;
}

interface AuthContextType {
    user: User | null;
    permissions: string | null;
    token: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}


// Crear el contexto con un valor por defecto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const API_URL = Platform.OS === 'android' 
    ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID 
    : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    

    const [user, setUser] = useState<User | null>(null);
    const [permissions, setPermissions] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Función para iniciar sesión
    const login = async (username: string, password: string) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { 
                    "Content-Type": 
                    "application/json" 
                },
                body: JSON.stringify({ username: username, password: password }),
            });

            const data = await response.json();

            if (data.success) {
                const userData: User = { name: data.name, username: data.username, roleId: data.roleId };

                setUser(userData);
                setPermissions(data.permissions);
                setToken(data.token);

                await AsyncStorage.setItem("user", JSON.stringify(userData));
                await AsyncStorage.setItem("token", data.token);
                await AsyncStorage.setItem("permissions", data.permissions);
            } else {
                setLoading(false);
                throw new Error(data.msg);
            }
        } catch (error) {
            setLoading(false);
            console.error("Login Error:", API_URL);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        setUser(null);
        setPermissions(null);
        setToken(null);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("permissions");
    };

    // Cargar usuario y token al iniciar la app
    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                const storedToken = await AsyncStorage.getItem("token");
                const storedPermissions = await AsyncStorage.getItem("permissions");

                if (storedUser && storedToken && storedPermissions) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                    setPermissions(storedPermissions);
                }
            } catch (error) {
                console.error("Error loading storage data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, permissions, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

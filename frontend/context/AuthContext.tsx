import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from 'expo-constants';

// Definir los tipos de datos que manejaremos en el contexto
interface User {
    name: string;
    roleId: number;
}

interface AuthContextType {
    user: User | null;
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
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Función para iniciar sesión
    const login = async (username: string, password: string) => {
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
                const userData: User = { name: data.name, roleId: data.roleId };

                setUser(userData);
                setToken(data.token);

                await AsyncStorage.setItem("user", JSON.stringify(userData));
                await AsyncStorage.setItem("token", data.token);
            } else {
                throw new Error(data.msg);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");
    };

    // Cargar usuario y token al iniciar la app
    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                const storedToken = await AsyncStorage.getItem("token");

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
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
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

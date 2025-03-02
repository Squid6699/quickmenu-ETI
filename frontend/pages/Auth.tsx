import { View } from "react-native";
import InputText from "../components/InputText";
import { useState } from "react";
import { AuthStyle } from "../styles/AuthStyles";
import { Text } from "react-native-paper";
import Button from "../components/Button";
import Constants from 'expo-constants';


const Auth = () => {
    const API_URL = Constants.expoConfig?.extra?.HOST_BACKEND ?? "";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ username: "", password: "" });

    const handleOnchangeUsername = (value: string) => {
        setUsername(value);
    }

    const handleOnchangePassword = (value: string) => {
        setPassword(value);
    }

    const handleLogin = async () => {
        if (!username) {
            setError({ ...error, username: "Username is required" });
            return;
        }

        if (!password) {
            setError({ ...error, password: "Password is required" });
            return;
        }

        setError({ username: "", password: "" });

        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (data.success){
                alert(data.msg);
                setLoading(false);
            }else{
                alert(data.msg);
                setLoading(false);
            }
        } catch (error) {
            alert("Error de conexión");
            setLoading(false);
        }

    }

    return (
        <View style={AuthStyle.body}>
            <View style={AuthStyle.container}>
                <Text style={AuthStyle.title}>Autentificate</Text>
                <View style={AuthStyle.inputContainer}>
                    <InputText label="Username" value={username} onChange={handleOnchangeUsername} error={error.username} />
                    <InputText label="Password" value={password} onChange={handleOnchangePassword} error={error.password} type="password" />
                    <Button text="Ingresar" onPress={handleLogin} loading={loading} disabled={loading} />
                </View>
            </View>
        </View>
    );

};

export default Auth;
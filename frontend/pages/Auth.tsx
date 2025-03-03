import { ImageBackground, View } from "react-native";
import InputText from "../components/InputText";
import { useState } from "react";
import { AuthStyle } from "../styles/AuthStyles";
import { Text } from "react-native-paper";
import Button from "../components/Button";
import { style } from "../App";
import { useAuth } from "../hook/useAuth";


const Auth = () => {
    const { login, loading } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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

        login(username, password);

    }

    return (
        <ImageBackground
            source={require('../assets/background.jpg')}
            style={style.background}
        >
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
        </ImageBackground>
    );
};

export default Auth;
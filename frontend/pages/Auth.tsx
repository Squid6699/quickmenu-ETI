import { ImageBackground, View } from "react-native";
import InputText from "../components/InputText";
import { useState } from "react";
import { AuthStyle } from "../styles/AuthStyles";
import { Text } from "react-native-paper";
import { useAuth } from "../hook/useAuth";
import { backgroundStyle } from "../styles/BackgroundStyles";
import ButtonsOptions from "../components/ButtonOptions";


const Auth = () => {
    const Style = AuthStyle();
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
            style={backgroundStyle.background}
        >
            <View style={Style.body}>
                <View style={Style.container}>
                    <Text style={Style.title}>LOG IN</Text>
                    <View style={Style.inputContainer}>
                        <InputText label="Username" value={username} onChange={handleOnchangeUsername} error={error.username} />
                        <InputText label="Password" value={password} onChange={handleOnchangePassword} error={error.password} type="password" />
                    </View>

                </View>
                <View style = {{alignSelf: "center"}}>
                    <ButtonsOptions title={"LOG IN"} onPress={handleLogin} iconName="log-in-outline" iconSize={30} description="Log in to your account" loading={loading} disabled={loading} />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Auth;
import { TouchableOpacity, View } from "react-native";
import InputText from "../components/InputText";
import { useState } from "react";
import { AuthStyle } from "../styles/AuthStyles";
import { Text } from "react-native-paper";


const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnchangeUsername = (value: string) => {
        if (value) {
            setUsername(value);
        }
    }

    const handleOnchangePassword = (value: string) => {
        if (value) {
            setPassword(value);
        }
    }

    const handleLogin = () => {

    }

    return (
        <View style={AuthStyle.body}>
            <View style={AuthStyle.container}>
                <Text style={AuthStyle.title}>Iniciar Sesión</Text>
                <View style={AuthStyle.inputContainer}>
                    <InputText label="Username" value={username} onChange={handleOnchangeUsername} />
                    <InputText label="Password" value={password} onChange={handleOnchangePassword} type="password" />
                </View>
                <TouchableOpacity style={AuthStyle.button} onPress={handleLogin}>
                    <Text style={AuthStyle.buttonText}>Ingresar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

};

export default Auth;
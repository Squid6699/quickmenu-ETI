import { View } from "react-native";
import InputText from "../components/InputText";
import { useState } from "react";


const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleOnchangeUsername = (value: string) => {
        if (value){
            setUsername(value);
        }
    }

    const handleOnchangePassword = (value: string) => {
        if (value){
            setPassword(value);
        }
    }

    return (
        <>
            <View>
                <InputText label={"Username"} value={username} onChange={handleOnchangeUsername}/>
                {/* <InputText label={"Password"} value={password} onChange={handleOnchangePassword}/> */}
            </View>
        </>
    );
};

export default Auth;
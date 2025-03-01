import { TouchableOpacity } from "react-native";
import { ButtonStyle } from "../styles/ButtonStyles";
import { ActivityIndicator, Icon, Text } from "react-native-paper";
import { ButtonProps } from "../types";

const Button = ({ text, onPress, loading, disabled, icon }: ButtonProps) => {
    return (
        <TouchableOpacity style={ButtonStyle.button} onPress={onPress} disabled={disabled} activeOpacity={0.7}>
            <Text style={ButtonStyle.buttonText}>
                {icon && <Icon source={icon} color={"white"} size={20} />}
                {loading ? <ActivityIndicator size="small" color="white" /> : text}
            </Text>
        </TouchableOpacity>
    );
};

export default Button;
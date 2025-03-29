import { StyleSheet } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

export const ButtonStyle = () => {
    const { colors } = useCustomColors();
    
    return StyleSheet.create({
        button: {
            backgroundColor: colors.textColor,
            paddingVertical: 12,
            borderRadius: 5,
            width: "100%",
            alignItems: "center",
        },
        buttonText: {
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
        }
    });
}
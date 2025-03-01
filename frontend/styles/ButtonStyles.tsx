import { StyleSheet } from 'react-native';
import { textColor } from './Colors';

export const ButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: textColor,
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

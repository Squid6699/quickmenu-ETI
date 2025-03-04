import { StyleSheet } from 'react-native';
import { backgroundColor, textColor } from './Colors';


export const AuthStyle = StyleSheet.create({
    body: {
        width: "75%",
        height : "100%",
        justifyContent: 'center',
        margin  : 'auto',
        
    },
    container: {
        width: "100%",
        padding: 30,
        borderRadius: 10,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
        backgroundColor: backgroundColor,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: textColor,
    },
    inputContainer: {
        width: "100%",
        height: "auto",
        gap: 10,
    }
});

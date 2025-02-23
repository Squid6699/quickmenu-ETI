import { StyleSheet } from 'react-native';

export const stylesButton = StyleSheet.create({
    button: {
        aspectRatio: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        margin: 8,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
    },
    icon: {
        marginBottom: 5,
    },
});
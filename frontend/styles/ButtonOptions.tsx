import { StyleSheet } from 'react-native';

export const stylesButtonOptions = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "column",
        alignItems: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 6,
        marginVertical: 6,
    },
    textContainer: {
        flex: 1, // Permite que el texto ocupe el espacio restante
        marginLeft: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    description: {
        fontSize: 12,
        textAlign: 'left',
    },
    icon: {
        width: 30,
        height: 30,
    },
});

import { StyleSheet } from 'react-native';

export const stylesButtonOptions = StyleSheet.create({
    body: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16, // Evita que los botones se peguen a los bordes laterales
        paddingBottom: 20, // Evita que los botones queden pegados a la gesture bar
    },
    container: {
        width: "97%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: 'center',
        alignItems: 'center',
    },
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
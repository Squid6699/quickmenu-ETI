import { StyleSheet } from 'react-native';

export const HomeStyles = StyleSheet.create({
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
});
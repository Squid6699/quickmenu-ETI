import { StyleSheet } from 'react-native';


export const AuthStyle = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
    },
    container: {
        width: "80%", // Ajuste mejor para tablets
        maxWidth: 500, // Evita que sea demasiado angosto
        padding: 30,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: "#333",
    },
    inputContainer: {
        width: "100%", // Hace que los inputs ocupen todo el ancho
    },
    button: {
        marginTop: 20,
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

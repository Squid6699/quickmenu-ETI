import { StyleSheet } from "react-native";

export const ModalAddUsersStyles = () => {

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20, // Separación entre el título y los inputs
        },
        modal: {
            backgroundColor: 'white',
            padding: 20,
            width: "80%",
            minHeight: "50%",
            alignSelf: 'center',
            borderRadius: 10,
        },
        modalContent: {
            flexDirection: 'column',
            gap: 15,
            width: "100%", // Ocupar todo el ancho disponible
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
        },
    });
};
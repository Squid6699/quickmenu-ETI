import { StyleSheet } from "react-native";
import { useCustomColors } from "../hook/useCustomColors";

export const ModalAddUsersStyles = () => {

    const {colorError, backgroundColor, textColor} = useCustomColors();

    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo oscuro semi-transparente
            height: "100%",
            width: "100%",
        },
        modal: {
            backgroundColor: backgroundColor,
            borderRadius: 10,
            padding: 20,
            width: "90%",
            height: "80%",
            elevation: 5,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 10,
        },
        modalContent: {
            gap: 10,
            width: "100%",
        },
        modalButtons: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
        },
        modalButtonSave: { 
            backgroundColor: textColor,
            alignItems: "center",
            padding: 5,
        },
        modalButtonCancel: {
            alignItems: "center",
            padding: 5,
            backgroundColor: "red",
        },
        errorText: {
            color: colorError,
            fontSize: 12,
            marginTop: 5,
        },
    });
};

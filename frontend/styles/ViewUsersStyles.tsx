import { StyleSheet } from "react-native";
import { useCustomColors } from "../hook/useCustomColors";

export const ViewUsersStyles = () => {

    const { backgroundCard, backgroundColor, headerColor } = useCustomColors();

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 15
        },

        activityIndicator: {
            justifyContent: "center",
            margin: "auto"
        },

        Card: {
            marginVertical: 8,
            padding: 10,
            backgroundColor: backgroundCard
        },

        CardTitle: {
            fontSize: 25,
            fontWeight: "bold"
        },

        CardContent: {
            fontSize: 20
        },

        header: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: headerColor,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
        },

        searchInput: {
            flex: 1,
            backgroundColor: "white",
            borderRadius: 10,
            marginRight: 10,
            color: "black",
        },

        addButton: {
            backgroundColor: backgroundColor,
            borderRadius: 10,
        },
    });
}
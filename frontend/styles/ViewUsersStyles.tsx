import { StyleSheet } from "react-native";
import { useCustomColors } from "../hook/useCustomColors";

export const ViewUsersStyles = () => {

    const { backgroundCard } = useCustomColors();

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
        }
    });
}
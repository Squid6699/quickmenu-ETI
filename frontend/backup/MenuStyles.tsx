import { StyleSheet } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';


export const MenuStyles = () => {
    const { colors } = useCustomColors();

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
            backgroundColor: colors.backgroundCard
        },

        CardTitle: {
            fontSize: 18,
            fontWeight: "bold"
        },

        CardDescription: {
            fontSize: 16,
            color: "black"
        },

        CardPrice: {
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 5
        }
    });
};
import { StyleSheet } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

export const OrderStyles = () => {
    const { colors } = useCustomColors();

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },

        activityIndicator: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },

        Card: {
            marginVertical: 10,
            padding: 15,
            backgroundColor: colors.backgroundCard,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },

        CardTitle: {
            fontSize: 20,
            fontWeight: "bold",
            color: colors.textColor,
        },

        CardDescription: {
            fontSize: 16,
            color: colors.textColor,
            marginTop: 5,
        },

        CardPrice: {
            fontSize: 18,
            fontWeight: "bold",
            color: colors.textColor,
            marginTop: 10,
        },
    });
};

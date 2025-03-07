import { StyleSheet } from 'react-native';
import { backgroundCard } from './Colors';

export const MenuStyles = StyleSheet.create({
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
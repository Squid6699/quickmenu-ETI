import { StyleSheet } from 'react-native';

export const HomeStyles = () => {
    return StyleSheet.create({
        body: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 16,
            paddingBottom: 20,
        },
        titleContainer: {
            width: '100%',
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#fff',
            textAlign: 'center',
        },
        container: {
            width: "97%",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};

import { View, Text, StyleSheet } from "react-native";


const Customize = () => {
    

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Selecciona un color:</Text>
            <View style={styles.colorPreview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        width: 250,
        height: 250,
    },
    colorPreview: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#000",
    },
});

export default Customize;

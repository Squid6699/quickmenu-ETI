import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import ColorPicker from 'react-native-wheel-color-picker'
import { useCustomColors } from '../../hook/useCustomColors';

const Customize = () => {
    const { colors } = useCustomColors();

    return (
        <View>
            <Text>ViewAssignedTables</Text>
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

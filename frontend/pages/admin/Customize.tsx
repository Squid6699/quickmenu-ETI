import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useCustomColors } from '../../hook/useCustomColors';
import { backgroundStyle } from '../../styles/BackgroundStyles';
import { Button } from 'react-native-paper';
import ModalPickColor from '../../components/ModalPickColor';
import { colorOption } from '../../types';

const Customize = () => {

    const { colors, handleColorChange } = useCustomColors();
    const [isModalOpen, setIsModalOpen] = useState(false); // Controlar la visibilidad del modal
    const [selectedColorOption, setSelectedColorOption] = useState<colorOption | null>(null); // Para saber qué color se seleccionó

    const colorOptions = [
        { name: 'Background Color', value: colors.backgroundColor },
        { name: 'Text Color', value: colors.textColor },
        { name: 'Icon Color', value: colors.iconColor },
        { name: 'Error Color', value: colors.colorError },
        { name: 'Success Color', value: colors.colorSuccess },
        { name: 'Header Color', value: colors.headerColor },
        { name: 'Card Background', value: colors.backgroundCard },
        { name: 'Button Background', value: colors.buttonBackground }
    ];

    const handleColorChangeWrapper = (color: string, colorName: string) => {
        handleColorChange(color, colorName); // Llama a la función del hook
    };

    // Función para abrir el modal y seleccionar un color
    const openModal = (colorOption:colorOption) => {
        setSelectedColorOption(colorOption); // Almacena la opción seleccionada
        setIsModalOpen(true); // Abre el modal
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedColorOption(null);
    };

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <View style={styles.container}>
                {colorOptions.map((colorOption, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.colorInfo}>
                            <Text style={styles.text}>{colorOption.name}</Text>
                            <View style={[styles.colorPreview, { backgroundColor: colorOption.value }]} />
                        </View>
                        <Button onPress={() => openModal(colorOption)}>SELECCIONAR</Button> {/* Abre el modal con la opción seleccionada */}
                    </View>
                ))}
            </View>

            {/* Modal para cambiar el color */}
            <ModalPickColor
                isOpen={isModalOpen} 
                onDismiss={closeModal} 
                onChange={handleColorChangeWrapper}
                color={selectedColorOption}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        elevation: 2,  // Sombra para Android
        shadowColor: '#000',  // Sombra para iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    colorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginRight: 10,
    },
    colorPreview: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },
});

export default Customize;

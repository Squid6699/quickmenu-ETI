import { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useCustomColors } from '../../hook/useCustomColors';
import { backgroundStyle } from '../../styles/BackgroundStyles';
import { Button } from 'react-native-paper';
import ModalPickColor from '../../components/ModalPickColor';
import { CustomizeType } from '../../types';

const Customize = () => {

    const { data, updateCustomize } = useCustomColors();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColorOption, setSelectedColorOption] = useState<CustomizeType | null>(null);

    const openModal = (colorOption:CustomizeType) => {
        setSelectedColorOption(colorOption);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedColorOption(null);
    };

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={backgroundStyle.background}>
            <View style={styles.container}>
                {data?.map((colorOption) => (
                    <View key={colorOption.id} style={styles.card}>
                        <View style={styles.colorInfo}>
                            <Text style={styles.text}>{colorOption.name}</Text>
                            <View style={[styles.colorPreview, { backgroundColor: colorOption.color }]} />
                        </View>
                        <Button onPress={() => openModal(colorOption)}>SELECCIONAR</Button>
                    </View>
                ))}
            </View>

            <ModalPickColor
                isOpen={isModalOpen} 
                onDismiss={closeModal} 
                color={selectedColorOption}
                updateCustomize={updateCustomize}
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

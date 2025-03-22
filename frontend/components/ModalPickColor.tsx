import ColorPicker from "react-native-wheel-color-picker";
import { ModalStyles } from "../styles/Modal";
import { ModalPickColorProps } from "../types";
import { Modal, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text } from "react-native-paper";
import { useState } from "react";

const ModalPickColor = ({ isOpen, onDismiss, color, updateCustomize }: ModalPickColorProps) => {
    const styles = ModalStyles();
    const [colorSelected, setColorSelected] = useState<string>("");

    const handleSaveColor = () => {
        updateCustomize(color?.id, colorSelected);
        onDismiss();
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <Text style={styles.title}>CHANGE COLOR</Text>

                            <ColorPicker
                                color={color?.color}
                                onColorChange={(color) => setColorSelected(color)}
                            />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CLOSE</Button>
                                <Button mode="outlined" textColor={"white"} onPress={() => handleSaveColor()} style={styles.modalButtonSave}>SAVE</Button>
                            </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalPickColor;
import ColorPicker from "react-native-wheel-color-picker";
import { ModalStyles } from "../styles/Modal";
import { ModalPickColorProps } from "../types";
import { Modal, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";

const ModalPickColor = ({ isOpen, onDismiss, onChange, color }: ModalPickColorProps) => {
    const styles = ModalStyles();

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <Text style={styles.title}>CHANGE COLOR</Text>

                            <ColorPicker
                                color={color?.value}
                                onColorChange={(color) => onChange(color, color)}
                            />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonSave}>CLOSE</Button>
                            </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalPickColor;
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, ActivityIndicator } from "react-native-paper";
import Constants from "expo-constants";
import { ModalDeleteProps } from "../types";
import { ModalStyles } from "../styles/Modal";
import { useState } from "react";

const ModalDelete = ({ isOpen, onDismiss, title, api, idDelete, content }: ModalDeleteProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android"
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [loadingDelete, setLoadingDelete] = useState(false);

    const submitDelete = async () => {
        setLoadingDelete(true);
        try {
            const response = await fetch(`${API_URL}/api/${api}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({ id: idDelete }),
            });

            const data = await response.json();
            if (data.success) {
                setLoadingDelete(false);
                onDismiss();
                alert(data.msg);
            } else {
                setLoadingDelete(false);
                alert(data.msg);
            }

        } catch (error) {
            alert(error)
            setLoadingDelete(false);
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>{title}</Text>
                            <Text>{content}</Text>
                            <View style={styles.modalButtons}>
                                <Button mode="outlined" color="white" onPress={onDismiss} style={styles.modalButtonCancel}>{"Cancel"}</Button>
                                <Button mode="outlined" color="white" onPress={submitDelete} style={styles.modalButtonSave} disabled={loadingDelete}>
                                    {loadingDelete ? <ActivityIndicator color="white" /> : "Delete"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )

}

export default ModalDelete;
import { Button, Text, ActivityIndicator } from "react-native-paper";
import InputText from "./InputText";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import { ModalStyles } from "../styles/Modal";

const ModalAddCategory = ({ isOpen, onDismiss }: { isOpen: boolean, onDismiss: () => void }) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [newCategory, setNewCategory] = useState({
        name: "",
    });

    const [error, setError] = useState({
        name: "",
    });

    const [loadingAddCategory, setLoadingAddCategory] = useState(false);

    const handleAddNewCategory = (field: string, value: string) => {
        setNewCategory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitAddNewCategory = async () => {
        setError({
            name: "",
        });

        if (!newCategory.name) return setError((prev) => ({ ...prev, name: "Name is required" }));

        try {
            setLoadingAddCategory(true);
            const response = await fetch(`${API_URL}/api/addCategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    name: newCategory.name,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setNewCategory({
                    name: "",
                });
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAddCategory(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>ADD NEW CATEGORY</Text>

                            <InputText label="Name" value={newCategory.name} onChange={(text) => handleAddNewCategory("name", text)} error={error.name} />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitAddNewCategory} style={styles.modalButtonSave} disabled={loadingAddCategory}>
                                    {loadingAddCategory ? <ActivityIndicator color="white" /> : "ADD"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
}

export default ModalAddCategory;
import { ModalEditCategoryProps } from "../types";
import useRolePermissions, { Role } from "../hook/useRolePermissions";
import { ModalStyles } from "../styles/Modal";
import { ModalEditRoleProps } from "../types";
import Constants from "expo-constants";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, ActivityIndicator, Switch } from "react-native-paper";
import InputText from "./InputText";
import { useEffect, useState } from "react";

const ModalEditCategory = ({ isOpen, onDismiss, category }: ModalEditCategoryProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [editCategory, setEditCategory] = useState({
        name: "",
    });

    const [error, setError] = useState({
        name: "",
    });

    const [loadingEditCategory, setLoadingEditCategory] = useState(false);

    const handleEditCategory = (field: string, value: string) => {
        setEditCategory((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        if (category) {
            setEditCategory({
                name: category.name || "",
            });
        }
    }, [category]);

    const submitEditCategory = async () => {
        setError({
            name: "",
        });

        if (!editCategory.name) return setError((prev) => ({ ...prev, name: "Name is required" }));

        try {
            setLoadingEditCategory(true);
            const response = await fetch(`${API_URL}/api/updateCategory`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    id: category?.id,
                    name: editCategory.name,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setEditCategory({
                    name: "",
                });
                alert(data.msg);
                onDismiss();
                setLoadingEditCategory(false);
            } else {
                setLoadingEditCategory(false);
                alert(data.msg);
            }
        } catch (error) {
            setLoadingEditCategory(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>EDIT ROLE</Text>

                            <InputText label="Name" value={editCategory.name} onChange={(text) => handleEditCategory("name", text)} error={error.name} />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitEditCategory} style={styles.modalButtonSave} disabled={loadingEditCategory}>
                                    {loadingEditCategory ? <ActivityIndicator color="white" /> : "EDIT"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );

}

export default ModalEditCategory;
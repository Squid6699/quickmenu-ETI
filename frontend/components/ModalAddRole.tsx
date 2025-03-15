import { Button, Text, ActivityIndicator, Switch } from "react-native-paper";
import InputText from "./InputText";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";
import { useState } from "react";
import { ModalStyles } from "../styles/Modal";
import { PaperProvider } from 'react-native-paper';

interface ModalAddRoleProps {
    isOpen: boolean;
    onDismiss: () => void;
}

const ModalAddRole = ({ isOpen, onDismiss }: ModalAddRoleProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android"
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [newRole, setNewRole] = useState({
        name: "",
        permissions: "",
    });

    const [error, setError] = useState({
        name: "",
        permissions: "",
    });

    const [loadingAddNewRole, setLoadingAddNewRole] = useState(false);

    const handleNewRole = (field: string, value: string) => {
        setNewRole((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const submitAddNewRole = async () => {
        setError({
            name: "",
            permissions: "",
        });

        if (!newRole.name) return setError((prev) => ({ ...prev, name: "Name is required" }));

        try {
            setLoadingAddNewRole(true);
            const response = await fetch(`${API_URL}/api/addRoles`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    // username: newUser.username,
                    // name: newUser.name,
                    // password: newUser.password,
                    // roleId: newUser.role,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setNewRole({
                    name: "",
                    permissions: "",
                });
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAddNewRole(false);
        }
    };

    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>ADD NEW ROLE</Text>

                                <InputText label="Name" value={newRole.name} onChange={(text) => handleNewRole("name", text)} error={error.name} />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text>ADMIN</Text>
                                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                                </View>

                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>Cancel</Button>
                                    <Button mode="outlined" textColor={"white"} onPress={submitAddNewRole} style={styles.modalButtonSave} disabled={loadingAddNewRole}>
                                        {loadingAddNewRole ? <ActivityIndicator color="white" /> : "Add"}
                                    </Button>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </PaperProvider>
        </Modal>

    );
};

export default ModalAddRole;

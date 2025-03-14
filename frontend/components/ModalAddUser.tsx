import { Button, Text, ActivityIndicator } from "react-native-paper";
import InputText from "./InputText";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-paper-dropdown";
import { useState } from "react";
import { ModalUserProps } from "../types";
import { ModalStyles } from "../styles/Modal";
import { PaperProvider } from 'react-native-paper';

const ModalAddUser = ({ isOpen, onDismiss, roles }: ModalUserProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android"
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [newUser, setNewUser] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [error, setError] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [loadingAddNewUser, setLoadingAddNewUser] = useState(false);

    const handleNewUser = (field: string, value: string) => {
        setNewUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const roleOptions = roles?.map((role) => ({
        label: role.name,
        value: role.id,
    })) || [];

    const submitAddNewUser = async () => {
        setError({
            username: "",
            name: "",
            password: "",
            confirmPassword: "",
            role: "",
        });

        if (!newUser.username) return setError((prev) => ({ ...prev, username: "Username is required" }));
        if (!newUser.name) return setError((prev) => ({ ...prev, name: "Name is required" }));
        if (!newUser.password) return setError((prev) => ({ ...prev, password: "Password is required" }));
        if (!newUser.confirmPassword) return setError((prev) => ({ ...prev, confirmPassword: "Confirm password is required" }));
        if (newUser.password !== newUser.confirmPassword) return setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
        if (!newUser.role) return setError((prev) => ({ ...prev, role: "Role is required" }));

        try {
            setLoadingAddNewUser(true);
            const response = await fetch(`${API_URL}/api/addUsers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    username: newUser.username,
                    name: newUser.name,
                    password: newUser.password,
                    roleId: newUser.role,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setNewUser({
                    username: "",
                    name: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                });
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAddNewUser(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>Add New User</Text>

                                <InputText label="Username" value={newUser.username} onChange={(value) => handleNewUser("username", value)} error={error.username} />
                                <InputText label="Name" value={newUser.name} onChange={(text) => handleNewUser("name", text)} error={error.name} />
                                <InputText label="Password" value={newUser.password} type="password" onChange={(text) => handleNewUser("password", text)} error={error.password} />
                                <InputText label="Confirm Password" value={newUser.confirmPassword} type="password" onChange={(text) => handleNewUser("confirmPassword", text)} error={error.confirmPassword} />

                                <Dropdown label="Role" placeholder="Select role" options={roleOptions} value={newUser.role} onSelect={(value) => handleNewUser("role", value || '')} error={!!error.role} />
                                {error.role && <Text style={styles.errorText}>Role is required</Text>}

                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" color="white" onPress={onDismiss} style={styles.modalButtonCancel}>{"Cancel"}</Button>
                                    <Button mode="outlined" color="white" onPress={submitAddNewUser} style={styles.modalButtonSave} disabled={loadingAddNewUser}>
                                        {loadingAddNewUser ? <ActivityIndicator color="white" /> : "Add"}
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

export default ModalAddUser;

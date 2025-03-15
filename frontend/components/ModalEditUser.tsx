import { ModalStyles } from "../styles/Modal";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { ModalEditUserProps } from "../types";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Button, Text, ActivityIndicator, PaperProvider } from "react-native-paper";
import InputText from "./InputText";
import { Dropdown } from "react-native-paper-dropdown";

const ModalEditUser = ({ isOpen, onDismiss, user, roles }: ModalEditUserProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android"
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [loadingEdit, setLoadingEdit] = useState(false);

    const getRoleId = (): string => roles?.find((role) => role.name === user?.ROL_NAME)?.id || ""

    const [editUser, setEditUser] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    useEffect(() => {
        if (user) {
            setEditUser({
                username: user.username || "",
                name: user.name || "",
                password: user.password || "",
                confirmPassword: "",
                role: getRoleId(),
            });
        }
    }, [user, roles]);

    const [error, setError] = useState({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        role: "",
    });
    
    const handleEditUser = (field: string, value: string) => {
        setEditUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const roleOptions = roles?.map((role) => ({
        label: role.name,
        value: role.id,
    })) || [];

    const submitDelete = async () => {

        setError({
            username: "",
            name: "",
            password: "",
            confirmPassword: "",
            role: "",
        });
        
        if (!editUser.username) return setError((prev) => ({ ...prev, username: "Username is required" }));
        if (!editUser.name) return setError((prev) => ({ ...prev, name: "Name is required" }));
        if (!editUser.password) return setError((prev) => ({ ...prev, password: "Password is required" }));
        if (!editUser.confirmPassword) return setError((prev) => ({ ...prev, confirmPassword: "Confirm password is required" }));
        if (editUser.password !== editUser.confirmPassword) return setError((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
        if (!editUser.role) return setError((prev) => ({ ...prev, role: "Role is required" }));

        try {
            setLoadingEdit(true);
            const response = await fetch(`${API_URL}/api/updateUsers`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-frontend-header': 'frontend'
                },
                body: JSON.stringify({
                    id: user?.id, 
                    username: editUser.username, 
                    name: editUser.name, 
                    password: editUser.password, 
                    roleId: editUser.role
                })
            });

            const data = await response.json();
            if (data.success) {
                setEditUser({
                    username: "",
                    name: "",
                    password: "",
                    confirmPassword: "",
                    role: "",
                });
                setLoadingEdit(false);
                alert(data.msg);
                onDismiss();
            } else {
                setLoadingEdit(false);
                alert(data.msg);
            }
        } catch (error) {
            console.log(error);
            setLoadingEdit(false);
        }

    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen} >
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>EDIT USER {user?.name?.toUpperCase()}</Text>
                                <InputText label="Username" value={editUser?.username} onChange={(value) => handleEditUser("username", value)} error={error.username} />
                                <InputText label="Name" value={editUser?.name} onChange={(text) => handleEditUser("name", text)} error={error.name} />
                                <InputText label="Password" value={editUser?.password} type="password" onChange={(text) => handleEditUser("password", text)} error={error.password} />
                                <InputText label="Confirm Password" value={editUser?.confirmPassword} type="password" onChange={(text) => handleEditUser("confirmPassword", text)} error={error.confirmPassword} />
                                <Dropdown label="Role" placeholder="Select role" options={roleOptions} value={editUser.role} onSelect={(value) => handleEditUser("role", value || '')} error={!!error.role} />
                                {error.role && <Text style={styles.errorText}>Role is required</Text>}
                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" textColor= {"white"} onPress={onDismiss} style={styles.modalButtonCancel}>{"Cancel"}</Button>
                                    <Button mode="outlined" textColor= {"white"} onPress={submitDelete} style={styles.modalButtonSave} disabled={loadingEdit}>
                                        {loadingEdit ? <ActivityIndicator color="white" /> : "Edit"}
                                    </Button>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </PaperProvider>
        </Modal>
    );
}

export default ModalEditUser;
import useRolePermissions, { Role } from "../hook/useRolePermissions";
import { ModalStyles } from "../styles/Modal";
import { ModalEditRoleProps } from "../types";
import Constants from "expo-constants";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, ActivityIndicator, Switch } from "react-native-paper";
import InputText from "./InputText";
import { useEffect, useState } from "react";

const ModalEditRole = ({ isOpen, onDismiss, role }: ModalEditRoleProps) => {
    const styles = ModalStyles();
    const { permissions, togglePermission, roleList, toggleFalsePermissions } = useRolePermissions();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [editRole, setEditRole] = useState({
        name: "",
    });

    const [error, setError] = useState({
        name: "",
    });

    const [loadingEditRole, setLoadingEditRole] = useState(false);

    const handleEditRole = (field: string, value: string) => {
        setEditRole((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
            if (role) {
                setEditRole({
                    name: role.name || "",
                });

                Object.keys(JSON.parse(role.permissions)).forEach((perm) => {
                    const p = perm as Role;
                    if (permissions[p] !== JSON.parse(role.permissions)[p]){
                        togglePermission(p);
                    }
                });


            }
        }, [role]);

    const submitEditRole = async () => {
        setError({
            name: "",
        });

        if (!editRole.name) return setError((prev) => ({ ...prev, name: "Name is required" }));

        try {
            setLoadingEditRole(true);
            const p = JSON.stringify(permissions);
            const response = await fetch(`${API_URL}/api/updateRoles`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    id: role?.id,
                    name: editRole.name,
                    permissions: p
                }),
            });

            const data = await response.json();

            if (data.success) {
                setEditRole({
                    name: "",
                });
                toggleFalsePermissions();
                alert(data.msg);
                onDismiss();
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingEditRole(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>EDIT ROLE</Text>

                            <InputText label="Name" value={editRole.name} onChange={(text) => handleEditRole("name", text)} error={error.name} />

                            <Text style={styles.title}>PERMISSIONS</Text>

                            {
                                Object.keys(roleList).map((r) => {
                                    const roleKey = r as Role;
                                    return (
                                        <View key={roleKey} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Text>{roleKey.toUpperCase()}</Text>
                                            <Switch value={permissions[roleKey]} onValueChange={() => togglePermission(roleKey)} />
                                        </View>
                                    );
                                })
                            }

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitEditRole} style={styles.modalButtonSave} disabled={loadingEditRole}>
                                    {loadingEditRole ? <ActivityIndicator color="white" /> : "EDIT"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

export default ModalEditRole;
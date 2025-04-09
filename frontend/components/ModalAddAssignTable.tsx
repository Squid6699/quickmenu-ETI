import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Text } from "react-native";
import Constants from "expo-constants";
import { ModalStyles } from "../styles/Modal";
import { ActivityIndicator, Button, PaperProvider } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { useState } from "react";
import { User } from "../types";

const ModalAddAssignTable = ({ isOpen, onDismiss, users }: { isOpen: boolean, onDismiss: () => void, users: User[] | undefined }) => {
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;
    const styles = ModalStyles();

    const [newUser, setNewUser] = useState({
        waitress: "",
        table: "",
    });

    const handleNewUser = (field: string, value: string) => {
        setNewUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const [loadingAddNewUser, setLoadingAddNewUser] = useState(false);

    const [error, setError] = useState({
        waitress: "",
        tables: "",
    });

    const usersOption = users?.filter((user: User) => {
        const perms = JSON.parse(user.permissions);
        return perms["Asignable"] === true;
    }).map((user: User) => ({
        label: user.name,
        value: user.id.toString(),
    })) || [];

    const waitressOption = users?.filter((user) => {
        const perms = JSON.parse(user.permissions);
        return perms["Ser Asignado"] === true;
    }).map((user: User) => ({
        label: user.name,
        value: user.id.toString(),
    })) || [];

    const submitAddNewUser = async () => {
        
        setError({tables: "", waitress: ""});

        if (!newUser.waitress) {
            setError((prev) => ({ ...prev, waitress: "Waitress is required" }));
            return;
        }

        if (!newUser.table) {
            setError((prev) => ({ ...prev, tables: "Table is required" }));
            return;
        }

        try {
            setLoadingAddNewUser(true);

            const response = await fetch(`${API_URL}/api/assignedTableAdd`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idUser: newUser.waitress,
                    idTable: newUser.table,
                }),
            });

            const data = await response.json();

            if (data.success){
                setLoadingAddNewUser(false);
                alert(data.msg);
                onDismiss();
            }else{
                setLoadingAddNewUser(false);
                alert(data.msg);
            }

        } catch (error) {
            setLoadingAddNewUser(false);
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>ADD NEW ASSIGN</Text>

                                <Dropdown label="Mesero" placeholder="Select waitress" options={usersOption} value={newUser.waitress} onSelect={(value) => handleNewUser("waitress", value || '')} error={!error.waitress} />
                                {error.waitress && <Text style={styles.errorText}>Waitress is required</Text>}

                                <Dropdown label="Mesa" placeholder="Select table" options={waitressOption} value={newUser.table} onSelect={(value) => handleNewUser("table", value || '')} error={!error.tables} />
                                {error.tables && <Text style={styles.errorText}>Table is required</Text>}

                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>Cancel</Button>
                                    <Button mode="outlined" textColor={"white"} onPress={submitAddNewUser} style={styles.modalButtonSave} disabled={loadingAddNewUser}>
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
}

export default ModalAddAssignTable;
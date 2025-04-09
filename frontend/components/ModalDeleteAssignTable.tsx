import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Text, ActivityIndicator, Card, Switch } from "react-native-paper";
import Constants from "expo-constants";
import { AssignedTable } from "../types";
import { ModalStyles } from "../styles/Modal";
import { useEffect, useState } from "react";

const ModalDeleteAssignTable = ({ isOpen, onDismiss, assingDelete }: { isOpen: boolean, onDismiss: () => void, assingDelete: AssignedTable | null }) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android"
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [loadingDelete, setLoadingDelete] = useState(false);
    const [tables, setTables] = useState<AssignedTable>();

    const [parsedTables, setParsedTables] = useState<any[]>([]);
    const [parsedIds, setParsedIds] = useState<any[]>([]);
    const [switchStates, setSwitchStates] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        if (assingDelete) {
            setTables(assingDelete);
        }
    }, [assingDelete]);

    useEffect(() => {
        const tablesArray = JSON.parse(tables?.Tables || "[]");
        const idsArray = JSON.parse(tables?.ids || "[]");
        setParsedTables(tablesArray);
        setParsedIds(idsArray);

        const initialSwitchStates: { [key: number]: boolean } = {};
        idsArray.forEach((item: any) => {
            initialSwitchStates[item.id] = true;
        });
        setSwitchStates(initialSwitchStates);
    }, [tables]);

    const toggleSwitch = (id: number) => {
        setSwitchStates((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const submitDelete = async () => {
        const activeIds = Object.keys(switchStates)
            .filter((id) => switchStates[parseInt(id)])
            .map((id) => parseInt(id));

        setLoadingDelete(true);

        try {
            const response = await fetch(`${API_URL}/api/assignedTableDelete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({ id: activeIds }),
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
            setLoadingDelete(false);
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>{"Delete assigned " + assingDelete?.Waitress}</Text>
                            <Card.Content>
                                <Text>{"Are you sure you want to delete?"}</Text>

                                {parsedTables.map((table, index) => {
                                    const id = parsedIds[index]?.id;

                                    return (
                                        <View key={table.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                                            <Text style={{ flex: 1 }}>{table.table}</Text>
                                            <Switch
                                                value={switchStates[id]}
                                                onValueChange={() => toggleSwitch(id)}
                                            />
                                        </View>
                                    );
                                })}
                            </Card.Content>
                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>{"Cancel"}</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitDelete} style={styles.modalButtonSave} disabled={loadingDelete}>
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

export default ModalDeleteAssignTable;
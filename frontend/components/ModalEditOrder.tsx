import { useEffect, useState } from "react";
import { ModalStyles } from "../styles/Modal";
import { ModalEditConfirmOrderProps } from "../types";
import { Modal, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import InputText from "./InputText";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalEditOrder = ({ isOpen, onDismiss, order }: ModalEditConfirmOrderProps) => {
    const styles = ModalStyles();

    useEffect(() => {
        if (order) {
            setEditConfirmOrderEdit({
                id: order.id,
                order: order?.order ?? null,
                quantity: order.quantity,
                comment: order.comment,
                total: (order?.order?.price || 0) * (order?.quantity || 0),
            });
        }
    }, [order]);


    const [confirmOrderEdit, setEditConfirmOrderEdit] = useState({
        id: "",
        order: order?.order,
        quantity: 0,
        comment: "",
        total: 0,
    });

    const [loadingEditOrder, setLoadingEditOrder] = useState(false);

    const handleEditOrder = (field: string, value: string) => {
        setEditConfirmOrderEdit((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "quantity") {
            setEditConfirmOrderEdit((prev) => ({
                ...prev,
                total: parseFloat(String(order?.total || "0")) * parseInt(value),
            }));
        }
    };

    const [error, setError] = useState({
        quantity: "",
    });

    const submitEditOrder = async () => {
        if (confirmOrderEdit.quantity === 0) {
            setError((prev) => ({
                ...prev,
                quantity: "Quantity is required",
            }));
            return;
        }
    
        setLoadingEditOrder(true);
        try {
            // EDITAR ORDEN EN LOCAL
            const storedOrders = await AsyncStorage.getItem("orders");
            const orders = storedOrders ? JSON.parse(storedOrders) : [];
            const index = orders.findIndex((o: any) => o.id === confirmOrderEdit.id);
            orders[index] = { ...confirmOrderEdit };
            await AsyncStorage.setItem("orders", JSON.stringify(orders));
    
            setLoadingEditOrder(false);
            onDismiss();
            alert("Order edited successfully");
        } catch (error) {
            alert("Error editing order");
            setLoadingEditOrder(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>{order?.order?.NAME_MENU}</Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                {order?.order?.description}
                            </Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                Price: ${order?.order?.price}
                            </Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                Total: ${confirmOrderEdit.total}
                            </Text>

                            <InputText label="Cantidad" value={confirmOrderEdit.quantity} onChange={(text) => handleEditOrder("quantity", text)} type="number" error={error.quantity} />
                            <InputText label="Comentario" value={confirmOrderEdit.comment} onChange={(text) => handleEditOrder("comment", text)} type="textarea" />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitEditOrder} style={styles.modalButtonSave} disabled={loadingEditOrder}>
                                    {loadingEditOrder ? <ActivityIndicator color="white" /> : "EDIT"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ModalEditOrder;

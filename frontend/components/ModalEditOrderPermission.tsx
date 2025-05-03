// NO TERMINADO

import { useEffect, useState } from "react";
import { ModalStyles } from "../styles/Modal";
import { ModalEditConfirmOrderProps, OrdersType } from "../types";
import { Modal, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import InputText from "./InputText";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalEditOrderPermission = ({ isOpen, onDismiss, order }: {isOpen: boolean, onDismiss (): void, order: OrdersType }) => {
    const styles = ModalStyles();

    useEffect(() => {
        console.log("order", order);
        if (order) {
            setEditConfirmOrderEdit({
                id: order.idOrderDetails,
                quantity: order.menuQuantity,
                comment: order.FOOD_COMMENTS || "",
                total: (order.FOOD_TOTAL || 0) * (order.menuQuantity || 0),
            });
        }
    }, [order]);


    const [confirmOrderEdit, setEditConfirmOrderEdit] = useState({
        id: "",
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
                total: parseFloat(String(order.FOOD_TOTAL || "0")) * parseInt(value),
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
                            <Text style={styles.title}>{order?.menuName}</Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                {order?.menuDescription}
                            </Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                Price: ${order?.FOOD_TOTAL}
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

export default ModalEditOrderPermission;

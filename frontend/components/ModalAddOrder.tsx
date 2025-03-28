import { useEffect, useState } from "react";
import { ModalStyles } from "../styles/Modal";
import { ModalAddOrderProps } from "../types";
import { Modal, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import InputText from "./InputText";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

const ModalAddOrder = ({ isOpen, onDismiss, menu }: ModalAddOrderProps) => {
    const styles = ModalStyles();

    useEffect(() => {
        setOrder((prev) => ({
            ...prev,
            order: menu,
            total: menu?.price,
        }));
    }, [menu]);

    const [order, setOrder] = useState({
        id: uuid.v4(),
        order: menu,
        quantity: 1,
        comment: "",
        total: menu?.price,
    });

    const [loadingAddOrder, setLoadingAddOrder] = useState(false);

    const handleAddOrder = (field: string, value: string) => {
        setOrder((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "quantity") {
            setOrder((prev) => ({
                ...prev,
                total: parseFloat(String(menu?.price || "0")) * parseInt(value),
            }));
        }
    };

    const [error, setError] = useState({
        quantity: "",
    });

    const submitAddOrder = async () => {
        if (order.quantity === 0) {
            setError((prev) => ({
                ...prev,
                quantity: "Quantity is required",
            }));
            return;
        }

        setLoadingAddOrder(true);
        try {
            const storedOrders = await AsyncStorage.getItem("orders");
            const orders = storedOrders ? JSON.parse(storedOrders) : [];
            
            const newOrder = { ...order, id: uuid.v4() };
            orders.push(newOrder);
            await AsyncStorage.setItem("orders", JSON.stringify(orders));

            setOrder((prev) => ({
                ...prev,
                id: uuid.v4(),
                order: menu,
                quantity: 1,
                comment: "",
                total: menu?.price,
            }));

            setLoadingAddOrder(false);
            onDismiss();
            alert("Order added successfully");
        } catch (error) {
            alert("Error adding order");
            setLoadingAddOrder(false);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            <Text style={styles.title}>{menu?.NAME_MENU}</Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                {menu?.description}
                            </Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                Price: ${menu?.price}
                            </Text>

                            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                                Total: ${order?.total}
                            </Text>

                            <InputText label="Cantidad" value={order.quantity} onChange={(text) => handleAddOrder("quantity", text)} type="number" error={error.quantity} />
                            <InputText label="Comentario" value={order.comment} onChange={(text) => handleAddOrder("comment", text)} type="textarea" />

                            <View style={styles.modalButtons}>
                                <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                <Button mode="outlined" textColor={"white"} onPress={submitAddOrder} style={styles.modalButtonSave} disabled={loadingAddOrder}>
                                    {loadingAddOrder ? <ActivityIndicator color="white" /> : "ADD"}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default ModalAddOrder;

import { Button, Text, ActivityIndicator, Switch } from "react-native-paper";
import InputText from "./InputText";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-paper-dropdown";
import { useState } from "react";
import { ModalAddMenuProps } from "../types";
import { ModalStyles } from "../styles/Modal";
import { PaperProvider } from 'react-native-paper';

const ModalAddMenu = ({ isOpen, onDismiss, categories }: ModalAddMenuProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [newMeal, setNewMeal] = useState({
        name: "",
        price: "",
        description: "",
        available: true,
        category: "",
    });

    const [error, setError] = useState({
        name: "",
        price: "",
        description: "",
        available: true,
        category: "",
    });

    const [loadingAddMenu, setLoadingAddMenu] = useState(false);

    const handleNewMeal = (field: string, value: string | boolean) => {
        setNewMeal((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const categoryOptions = categories?.map((category) => ({
        label: category.name,
        value: category.id,
    })) || [];

    const submitAddNewMenu = async () => {
        setError({
            name: "",
            price: "",
            description: "",
            available: true,
            category: "",
        });

        if (!newMeal.name) return setError((prev) => ({ ...prev, name: "Name is required" }));
        if (!newMeal.description) return setError((prev) => ({ ...prev, description: "Description is required" }));
        if (!newMeal.price) return setError((prev) => ({ ...prev, price: "Price is required" }));
        if (!newMeal.category) return setError((prev) => ({ ...prev, category: "Category is required" }));

        if (newMeal.price && isNaN(Number(newMeal.price))) return setError((prev) => ({ ...prev, price: "Price must be a number" }));

        try {
            setLoadingAddMenu(true);
            const response = await fetch(`${API_URL}/api/addMenu`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    name: newMeal.name,
                    price: newMeal.price,
                    description: newMeal.description,
                    idcategory: newMeal.category,
                    available: newMeal.available,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setNewMeal({
                    name: "",
                    price: "",
                    description: "",
                    available: true,
                    category: "",
                });
                alert(data.msg);
            } else {
                alert(data.msg);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingAddMenu(false);
        }
    };


    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>ADD NEW MEAL</Text>

                                <InputText label="Name" value={newMeal.name} onChange={(value) => handleNewMeal("name", value)} error={error.name} />
                                <InputText label="Description" value={newMeal.description} onChange={(text) => handleNewMeal("description", text)} error={error.description} type="textarea"/>
                                <InputText label="Price" value={newMeal.price} onChange={(text) => handleNewMeal("price", text)} error={error.price} type="number" />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text>Available</Text>
                                    <Switch value={newMeal.available} onValueChange={(va) => handleNewMeal("available", va)} />
                                </View>
                                <Dropdown label="Category" placeholder="Select caegory" options={categoryOptions} value={newMeal.category} onSelect={(value) => handleNewMeal("category", value || '')} error={!!error.category} />
                                {error.category && <Text style={styles.errorText}>Category is required</Text>}

                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                    <Button mode="outlined" textColor={"white"} onPress={submitAddNewMenu} style={styles.modalButtonSave} disabled={loadingAddMenu}>
                                        {loadingAddMenu ? <ActivityIndicator color="white" /> : "ADD"}
                                    </Button>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </TouchableWithoutFeedback>
            </PaperProvider>
        </Modal>
    )
}

export default ModalAddMenu;
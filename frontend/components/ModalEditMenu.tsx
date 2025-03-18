import { Button, Text, ActivityIndicator, Switch } from "react-native-paper";
import InputText from "./InputText";
import { Modal, Platform, View, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Constants from "expo-constants";
import { Dropdown } from "react-native-paper-dropdown";
import { useEffect, useState } from "react";
import { ModalEditMenuProps } from "../types";
import { ModalStyles } from "../styles/Modal";
import { PaperProvider } from 'react-native-paper';

const ModalEditMenu = ({ isOpen, onDismiss, menu, categories }: ModalEditMenuProps) => {
    const styles = ModalStyles();
    const API_URL = Platform.OS === "android" ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const [loadingEdit, setLoadingEdit] = useState(false);

    const getCategoryId = (): string => categories?.find((category) => category.name === menu?.CATEGORY_NAME)?.id || ""

    const [editMeal, setEditMeal] = useState({
        name: "",
        price: "",
        description: "",
        category: "",
        available: false,
    });

    useEffect(() => {
        if (menu) {
            setEditMeal({
                name: menu.NAME_MENU || "",
                description: menu.description || "",
                price: menu.price ? String(menu.price) : "",
                category: getCategoryId(),
                available: String(menu.available) === "1",
            });
        }
    }, [menu, categories]);

    const [error, setError] = useState({
        name: "",
        price: "",
        description: "",
        available: "",
        category: "",
    });

    const handleEditMeal = (field: string, value: string | boolean) => {
        setEditMeal((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const categoryOptions = categories?.map((category) => ({
        label: category.name,
        value: category.id,
    })) || [];

    const submitEditMeal = async () => {

        setError({
            name: "",
            price: "",
            description: "",
            available: "",
            category: "",
        });

        if (!editMeal.name) return setError((prev) => ({ ...prev, name: "Name is required" }));
        if (!editMeal.description) return setError((prev) => ({ ...prev, description: "Description is required" }));
        if (!editMeal.price) return setError((prev) => ({ ...prev, price: "Price is required" }));
        if (!editMeal.category) return setError((prev) => ({ ...prev, category: "Category is required" }));

        if (editMeal.price && isNaN(Number(editMeal.price))) return setError((prev) => ({ ...prev, price: "Price must be a number" }));

        try {
            setLoadingEdit(true);
            const response = await fetch(`${API_URL}/api/updateMenu`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-frontend-header": "frontend",
                },
                body: JSON.stringify({
                    id: menu?.idMenu,
                    name: editMeal.name,
                    price: editMeal.price,
                    description: editMeal.description,
                    idcategory: editMeal.category,
                    available: editMeal.available,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setEditMeal({
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
            console.log(error);
        } finally {
            setLoadingEdit(false);
        }

    };

    return (
        <Modal animationType="slide" transparent={true} visible={isOpen}>
            <PaperProvider>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <KeyboardAvoidingView behavior="padding" style={styles.modal}>
                            <ScrollView contentContainerStyle={styles.modalContent}>
                                <Text style={styles.title}>EDIT MEAL</Text>

                                <InputText label="Name" value={editMeal.name} onChange={(value) => handleEditMeal("name", value)} error={error.name} />
                                <InputText label="Description" value={editMeal.description} onChange={(text) => handleEditMeal("description", text)} error={error.description} type="textarea" />
                                <InputText label="Price" value={editMeal.price} onChange={(text) => handleEditMeal("price", text)} error={error.price} type="number" />
                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                    <Text>Available</Text>
                                    <Switch value={editMeal.available} onValueChange={(va) => handleEditMeal("available", va)} />
                                </View>
                                <Dropdown label="Category" placeholder="Select caegory" options={categoryOptions} value={editMeal.category} onSelect={(value) => handleEditMeal("category", value || '')} error={!!error.category} />
                                {error.category && <Text style={styles.errorText}>Category is required</Text>}

                                <View style={styles.modalButtons}>
                                    <Button mode="outlined" textColor={"white"} onPress={onDismiss} style={styles.modalButtonCancel}>CANCEL</Button>
                                    <Button mode="outlined" textColor={"white"} onPress={submitEditMeal} style={styles.modalButtonSave} disabled={loadingEdit}>
                                        {loadingEdit ? <ActivityIndicator color="white" /> : "EDIT"}
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

export default ModalEditMenu;
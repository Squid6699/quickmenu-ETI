import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper';
import InputText from './InputText';
import { Platform, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'react-native-paper-dropdown';
import { useState } from 'react';
import { RolesType } from '../types';
import { ModalAddUsersStyles } from '../styles/ModalAddUserStyles';

type ModalUserProps = {
    isOpen: boolean,
    onDismiss: () => void,
}

const ModalAddUser = ({ isOpen, onDismiss }: ModalUserProps) => {
    const styleModal = ModalAddUsersStyles();
    const API_URL = Platform.OS === 'android'
        ? Constants.expoConfig?.extra?.HOST_BACKEND_ANDROID
        : Constants.expoConfig?.extra?.HOST_BACKEND_IOS;

    const fetchRoles = async () => {
        const response = await fetch(`${API_URL}/api/getRoles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-frontend-header': 'frontend'
            },
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);
        return data.data;
    };

    const { data: roles, isLoading, isError, error, refetch } = useQuery<RolesType[]>({
        queryKey: ['roles'],
        queryFn: fetchRoles
    });

    const [newUser, setNewUser] = useState({
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const handleNewUser = (field: string, value: string) => {
        setNewUser((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const roleOptions = roles?.map(role => ({
        label: role.name,
        value: role.id
    })) || [];

    return (
        <Portal>
            <View style={styleModal.container}>
                <Modal visible={isOpen} onDismiss={onDismiss} contentContainerStyle={styleModal.modal}>
                    <Text style={styleModal.title}>Add User</Text>
                    <View style={styleModal.modalContent}>
                        <InputText
                            label="Username"
                            value={newUser.username}
                            onChange={(value) => handleNewUser("username", value)}
                        />
                        <InputText
                            label="Name"
                            value={newUser.name}
                            onChange={(text) => handleNewUser("name", text)}
                        />
                        <InputText
                            label="Password"
                            value={newUser.password}
                            type='password'
                            onChange={(text) => handleNewUser("password", text)}
                        />
                        <InputText
                            label="Confirm Password"
                            value={newUser.confirmPassword}
                            type='password'
                            onChange={(text) => handleNewUser("confirmPassword", text)}
                        />
                        <Dropdown
                            label="Role"
                            placeholder="Select role"
                            options={roleOptions}
                            value={newUser.role}
                            onSelect={(value) => handleNewUser("role", value || '')}
                        />
                    </View>
                    <View style={styleModal.modalButtons}>
                        <Button mode='outlined' color='red' textColor='black'>Cancelar</Button>
                        <Button mode='outlined'>Guardar</Button>
                    </View>
                </Modal>
            </View>
        </Portal>
    );
};

export default ModalAddUser;

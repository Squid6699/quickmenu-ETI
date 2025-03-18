import { ColorValue } from "react-native"

export interface ButtonHomeProps {
    title: String
    onPress: any
    backgroundColor?: ColorValue
    textColor?: ColorValue
    iconName?: String
    iconSize?: Number
    iconColor?: ColorValue
    description?: String
}

export interface ButtonOptionsProps {
    title: String
    onPress: any
    iconName?: String
    iconSize?: Number
    iconColor?: ColorValue
    description?: String
}

export interface ButtonProps {
    text: string,
    onPress: any,
    loading?: boolean,
    disabled?: boolean,
    icon?: string
}

export interface InputTextProps {
    value: string | number | undefined,
    label: string,
    placeholder?: string,
    error?: string,
    disable?: boolean,
    onChange: (value: string) => void,
    type?: "text" | "password" | "number" | "textarea"
}

export type RootStackParamList = {
    Home: undefined; 
    Menu: undefined; 
    Auth: undefined; 
    Admin: undefined;
    "Ordenes": undefined;
    "Usuarios": undefined;
    "Mesas Asignadas": undefined;
    "Roles": undefined;
    "Personalizar": undefined;
    "Ver Menu": undefined;

};

export type MenuType = {
    idMenu: string,
    NAME_MENU: string,
    price: number,
    description: string,
    CATEGORY_NAME: string,
    available: boolean
}

export type CustomizeType = {
    id: string,
    name: string,
    color: string
}

export type RolesType = {
    id: string,
    name: string
    permissions: string
}

export interface User {
    id: number;
    username: string;
    name: string;
    ROL_NAME: string;
    password: string;
}

export type ModalUserProps = {
    isOpen: boolean;
    onDismiss: () => void;
    roles: RolesType[] | undefined;
};

export type ModalDeleteProps = {
    isOpen: boolean;
    onDismiss: () => void;
    title: string;
    content: string;
    api: string;
    idDelete: string | number | undefined;
};

export type ModalEditUserProps = {
    isOpen: boolean;
    onDismiss: () => void;
    user: User | null;
    roles: RolesType[] | undefined;
};

export interface ModalAddRoleProps {
    isOpen: boolean;
    onDismiss: () => void;
}

export type ModalEditRoleProps = {
    isOpen: boolean;
    onDismiss: () => void;
    role: RolesType | null;
}

export type CategoriesType = {
    id: string,
    name: string
}

export type ModalAddMenuProps = {
    isOpen: boolean;
    onDismiss: () => void;
    categories: CategoriesType[] | undefined;
}

export type ModalEditMenuProps = {
    isOpen: boolean;
    onDismiss: () => void;
    menu: MenuType | null;
    categories: CategoriesType[] | undefined;
}
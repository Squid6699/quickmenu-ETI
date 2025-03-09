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
    backgroundColor?: ColorValue
    textColor?: ColorValue
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
    value: string
    label: string,
    placeholder?: string,
    error?: string,
    disable?: boolean,
    onChange: (value: string) => void,
    type?: "text" | "password"
}

export type RootStackParamList = {
    Home: undefined; 
    Menu: undefined; 
    Auth: undefined; 
    Admin: undefined;
    "Ver Ordenes": undefined;
    "Ver Usuarios": undefined;
    "Ver Mesas Asignadas": undefined;
    "Personalizar": undefined;
};

export type MenuType = {
    idMenu: string,
    NAME_MENU: string,
    price: number,
    description: string,
    CATEGORY_NAME: string,
    available: boolean
}

export type Customize = {
    id: string,
    name: string,
    color: string
}

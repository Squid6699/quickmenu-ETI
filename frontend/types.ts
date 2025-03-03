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

export interface InputTextProps {
    value: string
    label: string,
    placeholder?: string,
    error?: string,
    disable?: boolean,
    onChange: (value: string) => void,
    type?: "text" | "password"
}

export interface ButtonProps {
    text: string,
    onPress: any,
    loading?: boolean,
    disabled?: boolean,
    icon?: string
}

export type RootStackParamList = {
    Home: undefined; // No parámetros para la pantalla Home
    Menu: undefined; // No parámetros para la pantalla Menu
    Auth: undefined; // No parámetros para la pantalla Auth
    Admin: undefined; // No parámetros para la pantalla Auth

};
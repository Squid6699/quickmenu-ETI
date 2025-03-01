import { ColorValue } from "react-native"

export interface ButtonProps {
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
    error?: boolean,
    errorMsg?: string,
    disable?: boolean,
    onChange: (value: string) => void,
    type?: "text" | "password"
}
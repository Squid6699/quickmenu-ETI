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
    error?: Boolean,
    errorMsg?: string,
    disable?: Boolean,
    onChange: (value: string) => void
}
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
import React from 'react';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonProps } from '../types';
import { stylesButton } from '../styles/ButtonStyles';

const ButtonsHome = ({ title, onPress, backgroundColor = '#efc451', textColor = '#0a0909', iconName, iconSize = 30, iconColor = '#fff', description }: ButtonProps) => {
    const { width } = useWindowDimensions();
    const buttonWidth = width > 600 ? '45%' : '40%';

    return (
        <TouchableOpacity
            style={[stylesButton.button, { backgroundColor, width: buttonWidth }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconName && <Icon name={iconName} size={iconSize} color={iconColor} style={stylesButton.icon} />}
            <Text style={[stylesButton.text, { color: textColor }]}>{title}</Text>
            {description && <Text style={[stylesButton.description, { color: textColor }]}>{description}</Text>}
        </TouchableOpacity>
    );
};



export default ButtonsHome;

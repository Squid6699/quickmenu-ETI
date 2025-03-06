import React from 'react';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonHomeProps } from '../types';
import { stylesButtonOptions } from '../styles/ButtonOptions';

const ButtonsOptions = ({ title, onPress, backgroundColor = '#efc451', textColor = '#0a0909', iconName, iconSize = 30, iconColor = '#fff', description }: ButtonHomeProps) => {
    const { width } = useWindowDimensions();
    const buttonWidth = width > 600 ? '33%' : '40%';

    return (
        <TouchableOpacity
            style={[stylesButtonOptions.button, { backgroundColor, width: buttonWidth }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconName && <Icon name={iconName} size={iconSize} color={iconColor} style={stylesButtonOptions.icon} />}
            <Text style={[stylesButtonOptions.text, { color: textColor }]}>{title}</Text>
            {description && <Text style={[stylesButtonOptions.description, { color: textColor }]}>{description}</Text>}
        </TouchableOpacity>
    );
};



export default ButtonsOptions;

import React from 'react';
import { TouchableOpacity, Text, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonHomeProps } from '../types';
import { stylesButton } from '../styles/ButtonsHomeStyles';

const ButtonsHome = ({ title, onPress, iconName, iconSize = 30, description }: ButtonHomeProps) => {
    const Style = stylesButton();
    const { width } = useWindowDimensions();
    const buttonWidth = width > 600 ? '33%' : '40%';

    return (
        <TouchableOpacity
            style={[Style.button, { width: buttonWidth }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconName && <Icon name={iconName} size={iconSize} style={Style.icon} />}
            <Text style={Style.text}>{title}</Text>
            {description && <Text style={Style.description}>{description}</Text>}
        </TouchableOpacity>
    );
};



export default ButtonsHome;

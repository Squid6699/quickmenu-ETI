import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonOptionsProps } from '../types';
import { stylesButtonOptions } from '../styles/ButtonOptions';

const ButtonsOptions = ({ title, onPress, backgroundColor = '#efc451', textColor = '#0a0909', iconName, iconSize = 25, iconColor = '#fff', description }: ButtonOptionsProps) => {
    const Style = stylesButtonOptions();

    return (
        <TouchableOpacity
            style={Style.button}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconName && (
                <Icon name={iconName} size={iconSize} color={iconColor} style={Style.icon} />
            )}
            <View style={Style.textContainer}>
                <Text style={[Style.text, { color: textColor }]}>{title}</Text>
                {description && (
                    <Text style={[Style.description, { color: textColor }]}>{description}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ButtonsOptions;

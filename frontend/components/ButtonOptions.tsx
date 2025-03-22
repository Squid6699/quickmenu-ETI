import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonOptionsProps } from '../types';
import { stylesButtonOptions } from '../styles/ButtonOptions';

const ButtonsOptions = ({ title, onPress, iconName, iconSize = 25, description }: ButtonOptionsProps) => {
    const Style = stylesButtonOptions();

    return (
        <TouchableOpacity
            style={Style.button}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {iconName && (
                <Icon name={iconName} size={iconSize} style={Style.icon} />
            )}
            <View style={Style.textContainer}>
                <Text style={Style.text}>{title}</Text>
                {description && (
                    <Text style={Style.description}>{description}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default ButtonsOptions;

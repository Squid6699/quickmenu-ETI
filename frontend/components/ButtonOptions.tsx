import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonOptionsProps } from '../types';
import { stylesButtonOptions } from '../styles/ButtonOptions';
import { ActivityIndicator } from 'react-native-paper';

const ButtonsOptions = ({ title, onPress, iconName, iconSize = 25, description, loading, disabled }: ButtonOptionsProps) => {
    const Style = stylesButtonOptions();

    return (
        <TouchableOpacity
            style={Style.button}
            onPress={onPress}
            activeOpacity={0.7}
            disabled={disabled}
        >
            {iconName && !loading && (
                <Icon name={iconName} size={iconSize} style={Style.icon} />
            )}

            {loading && (
                <ActivityIndicator size="small" color="white" />
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

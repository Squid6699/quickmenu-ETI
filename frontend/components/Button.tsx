import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ButtonProps } from '../types';

const CustomButton = ({ title, onPress, backgroundColor = '#efc451', textColor = '#0a0909', iconName, iconSize = 30, iconColor = '#fff', description }: ButtonProps) => {
    const { width } = useWindowDimensions();
    const buttonWidth = width > 600 ? '33%' : '40%';

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

const stylesButton = StyleSheet.create({
    button: {
        aspectRatio: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        borderRadius: 8,
        margin: 8,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 3,
    },
    icon: {
        marginBottom: 5,
    },
});

export default CustomButton;

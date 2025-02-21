import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ButtonProps } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomButton = ({ title, onPress, backgroundColor = '#007bff', textColor = '#fff', iconName, iconSize = 20, iconColor, description }: ButtonProps) => {
    return (
        <View style={stylesButton.container}>
            <TouchableOpacity
                style={[stylesButton.button, { backgroundColor }]}
                onPress={onPress}
                activeOpacity={0.7}
            >
                {iconName &&
                    <Icon name={iconName} size={iconSize} color={iconColor} style={stylesButton.icon} />
                }
                <Text style={[stylesButton.text, { color: textColor }]}>{title}</Text>
            </TouchableOpacity>
        </View>

    );
};

const stylesButton = StyleSheet.create({

    container: {
        width: "75%",
        flexDirection: "column",
        flexWrap: "wrap"
    },

    button: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },

    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8, // Espaciado entre icono y texto
    },
    
    icon: {
        marginRight: 5,
    },
});

export default CustomButton;

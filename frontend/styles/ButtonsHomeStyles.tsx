import { StyleSheet } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

export const stylesButton = () => {
    const {colors} = useCustomColors();

    return StyleSheet.create({
        button: {
            aspectRatio: 1, 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            borderRadius: 8,
            margin: 8,
            backgroundColor: colors.backgroundColor
        },
        text: {
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 5,
            color: colors.textColor
        },
        description: {
            fontSize: 14,
            textAlign: 'center',
            marginTop: 3,
            color: colors.textColor
        },
        icon: {
            marginBottom: 5,
            color: colors.iconColor
        },
    });
}
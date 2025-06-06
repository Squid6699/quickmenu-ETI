import { StyleSheet } from 'react-native';
import { useCustomColors } from '../hook/useCustomColors';

export const stylesButtonOptions = () => {

    const { colors } = useCustomColors();

    return StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "column",
            alignItems: 'center',
        },
        button: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 6,
            marginVertical: 6,
            backgroundColor: colors.backgroundColor,
            width: '90%',
        },
        textContainer: {
            flex: 1, // Permite que el texto ocupe el espacio restante
            marginLeft: 10,
        },
        text: {
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'left',
            color: colors.textColor,
        },
        description: {
            fontSize: 12,
            textAlign: 'left',
            color: colors.textColor,
        },
        icon: {
            width: 30,
            height: 30,
            color: colors.iconColor,
        },
    });
}

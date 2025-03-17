import { ImageBackground, ScrollView, View } from "react-native";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import ButtonsOptions from "../../components/ButtonOptions";
import { stylesButtonOptions } from "../../styles/ButtonOptions";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "../../types";

const Admin = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const Style = stylesButtonOptions();

    const handlePressViewOrders = () => {
        navigation.navigate("Ordenes");
    }

    const handlePressViewUsers = () => {
        navigation.navigate("Usuarios");
    }

    const handlePressViewAssignedTables = () => {
        navigation.navigate("Mesas Asignadas");
    }

    const handlePressViewRoles = () => {
        navigation.navigate("Roles");
    }

    const handlePressCustomize = () => {
        navigation.navigate("Personalizar");
    }

    const handlePressViewMenu = () => {
        navigation.navigate("Ver Menu");
    }


    return (
        <>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={backgroundStyle.background}
            >
                <ScrollView contentContainerStyle={Style.container}>
                    <View style={Style.container}>
                        <ButtonsOptions title="Usuarios" description="Ver usuarios" onPress={handlePressViewUsers} iconName="body-outline" />
                        <ButtonsOptions title="Ordenes" description="Ver ordenes" onPress={handlePressViewOrders} iconName="receipt" />
                        <ButtonsOptions title="Mesas Asignadas" description="Ver mesas asignadas" onPress={handlePressViewAssignedTables} iconName="people-outline" />
                        <ButtonsOptions title="Ver Menu" description="Ver menu" onPress={handlePressViewMenu} iconName="fast-food-outline" />
                        <ButtonsOptions title="Roles" description="Ver roles" onPress={handlePressViewRoles} iconName="people-outline" />
                        <ButtonsOptions title="Personalizar" description="Ver colores" onPress={handlePressCustomize} iconName="cube-outline" />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
}

export default Admin;
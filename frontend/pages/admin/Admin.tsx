import { ImageBackground, ScrollView, View } from "react-native";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import ButtonsOptions from "../../components/ButtonOptions";
import { stylesButtonOptions } from "../../styles/ButtonOptions";
import { RootStackParamList } from "../../types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { handlePressCustomize, handlePressViewAssignTables, handlePressViewCategories, handlePressViewMenu, handlePressViewOrders, handlePressViewRoles, handlePressViewUsers } from "../../navigationsHandle";


const Admin = () => {
    const Style = stylesButtonOptions();
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <>
            <ImageBackground
                source={require('../../assets/background.jpg')}
                style={backgroundStyle.background}
            >
                <ScrollView contentContainerStyle={Style.container}>
                    <View style={Style.container}>
                        <ButtonsOptions title="Usuarios" description="Ver usuarios" onPress={() => handlePressViewUsers(navigation)} iconName="body-outline" />
                        <ButtonsOptions title="Ordenes" description="Ver ordenes" onPress={() => handlePressViewOrders(navigation)} iconName="receipt" />
                        <ButtonsOptions title="Asignar Mesas" description="Asignar Mesas a Meseros" onPress={() => handlePressViewAssignTables(navigation)} iconName="people-outline" />
                        <ButtonsOptions title="Ver Menu" description="Ver menu" onPress={() => handlePressViewMenu(navigation)} iconName="fast-food-outline" />
                        <ButtonsOptions title="Ver Categorias" description="Ver categorias" onPress={() => handlePressViewCategories(navigation)} iconName="copy-outline" />
                        <ButtonsOptions title="Roles" description="Ver roles" onPress={() => handlePressViewRoles(navigation)} iconName="people-outline" />
                        <ButtonsOptions title="Personalizar" description="Ver colores" onPress={() => handlePressCustomize(navigation)} iconName="cube-outline" />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
}

export default Admin;
import { ImageBackground, ScrollView, View } from "react-native";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import ButtonsOptions from "../../components/ButtonOptions";
import { stylesButtonOptions } from "../../styles/ButtonOptions";

const Admin = () => {

    const Style = stylesButtonOptions();

    const handlePressViewOrders = () => {
        console.log("Ver Ordenes");
    }

    const handlePressViewUsers = () => {
        console.log("Ver Usuarios");
    }

    const handlePressViewAssignedTables = () => {
        console.log("Ver Mesas Asignadas");
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
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
}

export default Admin;
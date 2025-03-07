import { ImageBackground, ScrollView, View } from "react-native";
import { backgroundStyle } from "../../styles/BackgroundStyles";
import ButtonsOptions from "../../components/ButtonOptions";
import { stylesButtonOptions } from "../../styles/ButtonOptions";

const Admin = () => {

    const handlePressViewOrders = () => {
        console.log("Ver Ordenes");
    }

    const handlePressViewTables = () => {
        console.log("Ver Mesas");
    }

    const handlePressViewWaitress = () => {
        console.log("Ver Meseros");
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
                <ScrollView contentContainerStyle={stylesButtonOptions.container}>
                    <View style={stylesButtonOptions.container}>
                        <ButtonsOptions title="Meseros" description="Ver meseros" onPress={handlePressViewWaitress} iconName="body-outline" />
                        <ButtonsOptions title="Mesas" description="Ver mesas" onPress={handlePressViewTables} iconName="tablet-landscape-outline" />
                        <ButtonsOptions title="Ordenes" description="Ver ordenes" onPress={handlePressViewOrders} iconName="receipt" />
                        <ButtonsOptions title="Mesas Asignadas" description="Ver mesas asignadas" onPress={handlePressViewAssignedTables} iconName="people-outline" />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
}

export default Admin;
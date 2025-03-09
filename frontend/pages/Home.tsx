import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import ButtonsHome from '../components/ButtonsHome';
import { HomeStyles } from '../styles/HomeStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../hook/useAuth';
import { backgroundStyle } from '../styles/BackgroundStyles';
import Button from "../components/Button";


const Home = () => {
    const { permissions, logout } = useAuth();
    const Style = HomeStyles();
    const permission = permissions ? JSON.parse(permissions) : null;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handlePressMenu = () => {
        navigation.navigate("Menu");
    };

    const handleLogOut = () => {
        logout();
    };

    const handleAdmin = () => {
        navigation.navigate("Admin");
    };

    return (
        <>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={backgroundStyle.background}
            >
                <ScrollView contentContainerStyle={Style.body}>
                    <View style={Style.container}>
                        <ButtonsHome title="Menu" description="Ver opciones" onPress={handlePressMenu} iconName="grid" />
                        <ButtonsHome title="Ordenar" description="Hacer pedido" onPress={() => Alert.alert('Ordenar')} iconName="add" />
                        <ButtonsHome title="Mesero" description="Llamar mesero" onPress={() => Alert.alert('Mesero')} iconName="person" />
                        <ButtonsHome title="Cuenta" description="Pedir cuenta" onPress={() => Alert.alert('Cuenta')} iconName="wallet" />
                        <Button text='Logout' onPress={handleLogOut}></Button>

                        {permission && permission.admin && <Button text='Admin' onPress={handleAdmin}></Button>}
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};




export default Home;
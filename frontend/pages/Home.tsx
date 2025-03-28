import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import ButtonsHome from '../components/ButtonsHome';
import { HomeStyles } from '../styles/HomeStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../hook/useAuth';
import { backgroundStyle } from '../styles/BackgroundStyles';
import Button from "../components/Button";
import { Text } from 'react-native-paper';
import { handleAdmin, handleOrder, handlePressMenu } from '../navigationsHandle';

const Home = () => {
    const { permissions, logout, user } = useAuth();
    const Style = HomeStyles();
    const permission = permissions ? JSON.parse(permissions) : null;
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const handleLogOut = () => {
        logout();
    };

    return (
        <>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={backgroundStyle.background}
            >
                <ScrollView contentContainerStyle={Style.body}>
                    <View style={Style.titleContainer}>
                        <Text style={Style.title}>{user?.name.toUpperCase()}</Text>
                    </View>

                    <View style={Style.container}>
                        <ButtonsHome title="Menu" description="Ver opciones" onPress={() => handlePressMenu(navigation)} iconName="grid" />
                        {permission && permission["Ordenar Productos"] && <ButtonsHome title="Ordenar" description="Hacer pedido" onPress={() => handleOrder(navigation)} iconName="add" />}
                        <ButtonsHome title="Mesero" description="Llamar mesero" onPress={() => Alert.alert('Mesero')} iconName="person" />
                        <ButtonsHome title="Cuenta" description="Pedir cuenta" onPress={() => Alert.alert('Cuenta')} iconName="wallet" />
                        <Button text='Logout' onPress={handleLogOut} />

                        {permission && permission.admin && <Button text='Admin' onPress={() => handleAdmin(navigation)} />}
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default Home;

import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import ButtonsHome from '../components/ButtonsHome';
import { HomeStyles } from '../styles/HomeStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../hook/useAuth';
import { backgroundStyle } from '../styles/BackgroundStyles';
import { Text } from 'react-native-paper';
import { handleAdmin, handleOrder, handlePressMenu, handlePressViewAssignTables } from '../navigationsHandle';
import ButtonsOptions from '../components/ButtonOptions';

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
                        {(permission && (permission["Ordenar Productos"] || permission["admin"])) && (
                            <ButtonsHome
                                title="Ordenar"
                                description="Hacer pedido"
                                onPress={() => handleOrder(navigation)}
                                iconName="add"
                            />
                        )}

                        {(permission && (permission["Asignar Mesas"] || permission["admin"])) && (
                            <ButtonsHome
                                title={"Asignar Mesas"}
                                description={"Asignar Mesas a Meseros"}
                                onPress={() => handlePressViewAssignTables(navigation)}
                                iconName="people"
                            />
                        )}


                        <ButtonsHome title="Mesero" description="Llamar mesero" onPress={() => Alert.alert('Mesero')} iconName="person" />
                        <ButtonsHome title="Cuenta" description="Pedir cuenta" onPress={() => Alert.alert('Cuenta')} iconName="wallet" />

                        <ButtonsOptions title="Logout" description="Cerrar sesion" onPress={handleLogOut} iconName="log-out-outline" />
                        {permission && permission.admin && <ButtonsOptions title={"Admin"} description="Ver opciones de admin" onPress={() => handleAdmin(navigation)} iconName="settings-outline" />}

                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default Home;

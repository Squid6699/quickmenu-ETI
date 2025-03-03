import { Alert, ImageBackground, ScrollView, View } from 'react-native';
import ButtonsHome from '../components/ButtonsHome';
import { HomeStyles } from '../styles/HomeStyles';
import { style } from '../App';

const Home = () => {
    return (
        <>
            <ImageBackground
                source={require('../assets/background.jpg')}
                style={style.background}
            >
                <ScrollView contentContainerStyle={HomeStyles.body}>
                    <View style={HomeStyles.container}>
                        <ButtonsHome title="Menu" description="Ver opciones" onPress={() => Alert.alert('Menu')} iconName="grid" />
                        <ButtonsHome title="Ordenar" description="Hacer pedido" onPress={() => Alert.alert('Ordenar')} iconName="add" />
                        <ButtonsHome title="Mesero" description="Llamar mesero" onPress={() => Alert.alert('Mesero')} iconName="person" />
                        <ButtonsHome title="Cuenta" description="Pedir cuenta" onPress={() => Alert.alert('Cuenta')} iconName="wallet" />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};




export default Home;
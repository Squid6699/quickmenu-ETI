import { Alert, ScrollView, StyleSheet, View, SafeAreaView, ImageBackground, useWindowDimensions } from 'react-native';
import CustomButton from './components/Button';

export default function App() {
  return (

    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.background}
        resizeMode='cover'
      >
        <ScrollView contentContainerStyle={styles.body}>
          <View style={styles.container}>
            <CustomButton title="Menu" description="Ver opciones" onPress={() => Alert.alert('Menu')} iconName="grid" />
            <CustomButton title="Ordenar" description="Hacer pedido" onPress={() => Alert.alert('Ordenar')} iconName="add" />
            <CustomButton title="Mesero" description="Llamar mesero" onPress={() => Alert.alert('Mesero')} iconName="person" />
            <CustomButton title="Cuenta" description="Pedir cuenta" onPress={() => Alert.alert('Cuenta')} iconName="wallet" />
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0909',
  },
  
  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', // Centra el contenido
    alignItems: 'center', // Centra el contenido horizontalmente
  },

  body: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16, // Evita que los botones se peguen a los bordes laterales
    paddingBottom: 20, // Evita que los botones queden pegados a la gesture bar
  },
  container: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'center',
    alignItems: 'center',
  },
});

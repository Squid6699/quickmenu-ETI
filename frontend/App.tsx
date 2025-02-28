import { ImageBackground, SafeAreaView, StyleSheet } from 'react-native';
import Auth from './pages/Auth';
import Home from './pages/Home';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar hidden={true} />
      <ImageBackground
        source={require('./assets/background.jpg')}
        style={style.background}
        resizeMode='cover'
      >
        {/* <Home /> */}
        <Auth />
      </ImageBackground>

    </SafeAreaView>

  );
}

export const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0909',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center', // Centra el contenido
    alignItems: 'center', // Centra el contenido horizontalmente
  },
});


import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './navigation';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <SafeAreaView style={style.safeArea}>
      <StatusBar hidden={true} />
      <AuthProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaView>
  );
}


export const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0909',
  },

  background: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center', // Centra el contenido
    // alignItems: 'center', // Centra el contenido horizontalmente
    resizeMode: 'cover',
  },
});


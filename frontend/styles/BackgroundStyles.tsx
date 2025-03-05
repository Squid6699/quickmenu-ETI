import { SafeAreaView, StyleSheet } from 'react-native';

export const backgroundStyle = StyleSheet.create({
  background: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center', // Centra el contenido
    // alignItems: 'center', // Centra el contenido horizontalmente
    resizeMode: 'cover',
  }
});
import { Alert, StyleSheet, View } from 'react-native';
import CustomButton from './components/Button';

export default function App() {
  return (
    <View style={styles.container}>

      <CustomButton title="Menu" onPress={() => Alert.alert('Menu')} iconName="grid" />
      <CustomButton title="Ordenar" onPress={() => Alert.alert('Ordenar')} iconName="add" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

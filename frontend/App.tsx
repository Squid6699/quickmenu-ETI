import { SafeAreaView, StyleSheet } from 'react-native';
import Navigation from './navigation';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchInterval: 60000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={style.safeArea}>
        <StatusBar hidden={true} />
        <AuthProvider>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AuthProvider>
      </SafeAreaView>
    </QueryClientProvider>
  );
}


export const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0a0909',
  }
});


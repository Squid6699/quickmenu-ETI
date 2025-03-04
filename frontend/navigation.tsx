import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";
import { RootStackParamList } from "./types";
import Admin from "./pages/Admin";
import { backgroundColor, headerColor } from "./styles/Colors";

const Stack = createStackNavigator<RootStackParamList>();


export default function Navigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {
        user ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: true }} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )
      }
    </Stack.Navigator>
  );
}

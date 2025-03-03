import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";

const Stack = createStackNavigator();

export default function Navigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {
        user ? (
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )
      }
    </Stack.Navigator>
  );
}

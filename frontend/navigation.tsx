import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";
import { RootStackParamList } from "./types";
import Admin from "./pages/admin/Admin";
import ViewOrders from "./pages/admin/ViewOrders";
import ViewTables from "./pages/admin/ViewTables";
import ViewWaitress from "./pages/admin/ViewWaitress";
import ViewAssignedTables from "./pages/admin/ViewAssignedTables";
import { useCustomColors } from "./hook/useCustomColors";

const Stack = createStackNavigator<RootStackParamList>();


export default function Navigation() {
  const { backgroundColor, headerColor } = useCustomColors();
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {
        user ? (
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Menu" component={Menu} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />

            {/* ADMIN */}
            <Stack.Screen name="Admin" component={Admin} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />
            <Stack.Screen name="Ver Ordenes" component={ViewOrders} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />
            <Stack.Screen name="Ver Mesas" component={ViewTables} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />
            <Stack.Screen name="Ver Meseros" component={ViewWaitress} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />
            <Stack.Screen name="Ver Mesas Asignadas" component={ViewAssignedTables} options={{ headerShown: true, headerStyle: {backgroundColor: headerColor}, headerTintColor: backgroundColor }} />


          </>
        ) : (
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        )
      }
    </Stack.Navigator>
  );
}

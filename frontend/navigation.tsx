import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./pages/Home";
import { useAuth } from "./hook/useAuth";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";
import { RootStackParamList } from "./types";
import Admin from "./pages/admin/Admin";
import ViewOrders from "./pages/ViewOrders";
import ViewAssignTables from "./pages/ViewAssignTables";
import { useCustomColors } from "./hook/useCustomColors";
import ViewUsers from "./pages/admin/ViewUsers";
import Customize from "./pages/admin/Customize";
import ViewRoles from "./pages/admin/ViewRoles";
import ViewMenu from "./pages/admin/ViewMenu";
import ViewCategory from "./pages/admin/ViewCategory";
import Order from "./pages/Order";
import ViewAssignedTables from "./pages/ViewAssignedTables";
import ViewOrderTable from "./pages/ViewOrderTable";
import ViewAllTables from "./pages/ViewAllTables";
import ViewKitchen from "./pages/ViewKitchen";
import ViewBill from "./pages/ViewBill";

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const { colors } = useCustomColors();
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ordenar" component={Order} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />


          <Stack.Screen name="Admin" component={Admin} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ordenes" component={ViewOrders} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Usuarios" component={ViewUsers} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ver Mesas Asignadas" component={ViewAssignedTables} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Asignar Mesas" component={ViewAssignTables} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Roles" component={ViewRoles} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Personalizar" component={Customize} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ver Menu" component={ViewMenu} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ver Categorias" component={ViewCategory} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ver Orden de Mesa Asignada" component={ViewOrderTable} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Ver todas las mesas" component={ViewAllTables} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Cocina" component={ViewKitchen} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />
          <Stack.Screen name="Generar cuenta" component={ViewBill} options={{ headerShown: true, headerStyle: { backgroundColor: colors.headerColor }, headerTintColor: colors.backgroundColor }} />


        </>
      ) : (
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}

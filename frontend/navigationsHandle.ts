import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types';

export const handlePressViewOrders = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Ordenes");
};

export const handlePressViewUsers = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Usuarios");
};

export const handlePressViewAssignTables = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Asignar Mesas");
};

export const handlePressViewRoles = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Roles");
};

export const handlePressCustomize = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Personalizar");
};

export const handlePressViewMenu = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Ver Menu");
};

export const handlePressViewCategories = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Ver Categorias");
};

export const handlePressMenu = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Menu");
};

export const handleAdmin = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Admin");
};

export const handleOrder = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Ordenar");
};

export const handlePressViewAssignedTables = (navigation: NavigationProp<RootStackParamList>) => {
  navigation.navigate("Ver Mesas Asignadas");
};

export const handleViewOrderTable = (
  navigation: NavigationProp<RootStackParamList>,
  item: any
) => {
  navigation.navigate("Ver Orden de Mesa Asignada", { mesa: item });
};

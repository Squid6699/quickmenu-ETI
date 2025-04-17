// NO TERMINADO
//AQUI VAN SE VAN A VER LAS ORDENES DE LAS MESAS ASIGNADAS CUANDO LE DAS CLIC EN VER ORDEN DESDE ViewAssignedTables.tsx

import { View } from "react-native";
import { Text } from "react-native-paper";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types";

type ViewOrderTableRouteProp = RouteProp<RootStackParamList, "Ver Orden de Mesa Asignada">;

const ViewOrderTable = () => {
    const route = useRoute<ViewOrderTableRouteProp>();
    const { mesa } = route.params;

    return (
        <View>
            <Text>{mesa.id}</Text>
            <Text>{mesa.table}</Text>
        </View>
    );
};

export default ViewOrderTable;
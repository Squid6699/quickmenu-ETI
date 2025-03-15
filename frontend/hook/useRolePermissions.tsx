import { useState } from "react";

export type Role = "admin" | "Asignar Mesas" | "Generar Tickets" | "Ver Tickets" | "Ver Mesas" | "Actualizar Ordenes" | "Ver Ordenes" | "Pagar Ordenes" | "Llamar Mesero" | "Pedir Cuenta" | "Actualizar Productos";

const useRolePermissions = () => {

    const roleList = {
        admin: false,
        "Generar Tickets": false,
        "Ver Tickets": false,
        "Ver Mesas": false,
        "Asignar Mesas": false,
        "Actualizar Ordenes": false,
        "Ver Ordenes": false,
        "Pagar Ordenes": false,
        "Llamar Mesero": false,
        "Pedir Cuenta": false,
        "Actualizar Productos": false,
        
    }

    const [permissions, setPermissions] = useState(roleList);

    

    const togglePermission = (role: Role) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [role]: !prevPermissions[role],
        }));
    };

    return {
        permissions,
        togglePermission,
        roleList
    };
};

export default useRolePermissions;
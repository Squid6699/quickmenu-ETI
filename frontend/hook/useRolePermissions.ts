import { useState } from "react";

export type Role = "Asignable" | "Ser Asignado" | "Ordenar Productos" | "admin" | "Asignar Mesas" | "Generar Tickets" | "Ver Tickets" | "Ver Mesas" | "Actualizar Ordenes" | "Ver Ordenes" | "Pagar Ordenes" | "Llamar Mesero" | "Pedir Cuenta" | "Actualizar Productos";

const useRolePermissions = () => {

    const roleList = {
        admin: false,
        "Generar Tickets": false,
        "Ver Tickets": false,
        "Ver Mesas": false,
        "Asignar Mesas": false,
        "Asignable": false, // Waitress
        "Ser Asignado": false, // Tables
        "Actualizar Ordenes": false,
        "Ver Ordenes": false,
        "Pagar Ordenes": false,
        "Llamar Mesero": false,
        "Pedir Cuenta": false,
        "Actualizar Productos": false,
        "Ordenar Productos": false,
    }

    const [permissions, setPermissions] = useState(roleList);

    const togglePermission = (role: Role) => {
        setPermissions(prevPermissions => ({
            ...prevPermissions,
            [role]: !prevPermissions[role],
        }));
    };

    const toggleFalsePermissions = () => {
        setPermissions(roleList);
    }

    return {
        permissions,
        togglePermission,
        roleList,
        toggleFalsePermissions
    };
};

export default useRolePermissions;
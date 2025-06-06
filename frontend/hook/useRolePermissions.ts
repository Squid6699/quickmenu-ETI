import { useState } from "react";

export type Role = "Ver Cocina" | "Asignable" | "Ser Asignado" | "Ordenar Productos" | "admin" | "Asignar Mesas" | "Generar Tickets" | "Ver Tickets" | "Ver Mesas" | "Actualizar Ordenes" | "Ver todas las ordenes" | "Pagar Ordenes" | "Llamar Mesero" | "Pedir Cuenta" | "Actualizar Productos";

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
        "Ver todas las ordenes": false,
        "Pagar Ordenes": false,
        "Llamar Mesero": false,
        "Pedir Cuenta": false,
        "Actualizar Productos": false,
        "Ordenar Productos": false,
        "Ver Cocina": false,
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
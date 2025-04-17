export interface ButtonHomeProps {
    title: String
    onPress: any
    iconName?: String
    iconSize?: Number
    description?: String
}

export interface ButtonOptionsProps {
    title: String
    onPress: any
    iconName?: String
    iconSize?: Number
    description?: String
    loading?: boolean
    disabled?: boolean
}

export interface ButtonProps {
    text: string,
    onPress: any,
    loading?: boolean,
    disabled?: boolean,
    icon?: string
}

export interface InputTextProps {
    value: string | number | undefined,
    label: string,
    placeholder?: string,
    error?: string,
    disable?: boolean,
    onChange: (value: string) => void,
    type?: "text" | "password" | "number" | "textarea"
}

export type RootStackParamList = {
    Home: undefined;
    Menu: undefined;
    Auth: undefined;
    Admin: undefined;
    Ordenar: undefined;
    "Ordenes": undefined;
    "Usuarios": undefined;
    "Mesas Asignadas": undefined;
    "Asignar Mesas": undefined;
    "Roles": undefined;
    "Personalizar": undefined;
    "Ver Menu": undefined;
    "Ver Categorias": undefined;
    "Ver Mesas Asignadas": undefined;
    "Ver Orden de Mesa Asignada": {mesa: Mesa};
};

export type Mesa = {
    id: string
    table: string
}

export type MenuType = {
    idMenu: string,
    NAME_MENU: string,
    price: number,
    description: string,
    CATEGORY_NAME: string,
    available: boolean
}

export type CustomizeType = {
    id: string,
    name: string,
    color: string
}

export type RolesType = {
    id: string,
    name: string
    permissions: string
}

export interface User {
    id: number;
    username: string;
    name: string;
    ROL_NAME: string;
    password: string;
    permissions: string;
}

export type ModalUserProps = {
    isOpen: boolean;
    onDismiss: () => void;
    roles: RolesType[] | undefined;
};

export type ModalDeleteProps = {
    isOpen: boolean;
    onDismiss: () => void;
    title: string;
    content: string;
    api: string;
    idDelete: string | number | undefined | string[] | number[];
};

export type ModalEditUserProps = {
    isOpen: boolean;
    onDismiss: () => void;
    user: User | null;
    roles: RolesType[] | undefined;
};

export interface ModalAddRoleProps {
    isOpen: boolean;
    onDismiss: () => void;
}

export type ModalEditRoleProps = {
    isOpen: boolean;
    onDismiss: () => void;
    role: RolesType | null;
}

export type CategoriesType = {
    id: string,
    name: string
}

export type ModalAddMenuProps = {
    isOpen: boolean;
    onDismiss: () => void;
    categories: CategoriesType[] | undefined;
}

export type ModalEditMenuProps = {
    isOpen: boolean;
    onDismiss: () => void;
    menu: MenuType | null;
    categories: CategoriesType[] | undefined;
}

export type ModalEditCategoryProps = {
    isOpen: boolean;
    onDismiss: () => void;
    category: CategoriesType | null;
}

export type ModalPickColorProps = {
    isOpen: boolean;
    onDismiss: () => void;
    color: CustomizeType | undefined | null;
    updateCustomize: (id: string | undefined, color: string) => void;
}

export type ModalAddOrderProps = {
    isOpen: boolean;
    onDismiss: () => void;
    menu: MenuType | null | undefined;
}

export type OrdersType = {
    idOrderDetails: string;
    idOrder: string;
    idMenu: string;
    menuQuantity: number;
    FOOD_TOTAL: number;
    FOOD_STATUS: string;
    FOOD_COMMENTS: string;
    menuName: string;
    menuDescription: string;
    ORDER_STATUS: string;
    WAITRESS: string;
    TABLE: string;
    TOTAL: number;
}

export type confirmOrder = {
    id: string,
    comment: string,
    quantity: number,
    total: number,
    order: MenuType | undefined | null
}

export type ModalEditConfirmOrderProps = {
    isOpen: boolean;
    onDismiss: () => void;
    order: confirmOrder | null | undefined;
}

export type AssignedWaitress = {
    idWaitress: string,
    username: string
}

export type AssignedTable = {
    ids: string,
    idWaitress: string,
    Waitress: string,
    Tables: string
}
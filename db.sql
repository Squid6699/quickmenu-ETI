CREATE DATABASE quickmenu;
USE quickmenu;

-- Tabla de Roles (Admin, Mesera, Cocina, etc.)
CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    permissions LONGTEXT NULL
    UNIQUE KEY `Nombre` (`name`)
);

-- Tabla de Usuarios (Meseros, Cocina, Admin)
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    roleId INT,
    FOREIGN KEY (roleId) REFERENCES Role(id)
);

CREATE TABLE Category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
    UNIQUE KEY `Nombre` (`name`)
);

-- Tabla de Menú (Platillos disponibles)
CREATE TABLE Menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    idCategory INT,
    available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (idCategory) REFERENCES Category(id)
);

-- Tabla de Pedidos (Órdenes de los clientes)
CREATE TABLE Orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Pagado') DEFAULT 'Pendiente',
    idTable INT,
    idWaitress INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idTable) REFERENCES Users(id),
    FOREIGN KEY (idWaitress) REFERENCES Users(id)
);

-- Tabla de Detalles de Pedidos (Qué platillos están en cada pedido)
CREATE TABLE OrderDetails (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    menuId INT,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    status ENUM('Pendiente', 'En Preparación', 'Listo', 'Entregado', 'Pagado') DEFAULT 'Pendiente',
    comments TEXT NULL, -- Comentarios sobre el platillo (ej. "Sin cebolla", "Extra queso")
    FOREIGN KEY (orderId) REFERENCES Orders(id),
    FOREIGN KEY (menuId) REFERENCES Menu(id)
);

-- Tabla para manejar el historial de estados de una orden
CREATE TABLE OrderStatusHistory (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    status ENUM('Pendiente', 'En Preparación', 'Listo', 'Entregado'),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES Orders(id)
);

-- Tabla de Tickets (Facturación separada o conjunta)
CREATE TABLE Tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    orderId INT,
    total DECIMAL(10,2) NOT NULL,
    separate BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES Orders(id)
);

-- Tabla de Mesas Asignadas (Qué usuario maneja qué mesas)
CREATE TABLE Assigned_Tables (
    id INT PRIMARY KEY AUTO_INCREMENT,
    idUser INT,
    idTable INT UNIQUE,
    FOREIGN KEY (idUser) REFERENCES Users(id),
    FOREIGN KEY (idTable) REFERENCES Users(id)
);

CREATE TABLE Customize (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(50) NOT NULL
);

-- Tabla de Reservaciones (Clientes que reservan mesas)
-- CREATE TABLE Reservations (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     idUser INT,
--     idTable INT,
--     date DATETIME NOT NULL,
--     numClients INT NOT NULL,
--     FOREIGN KEY (idUser) REFERENCES Users(id),
--     FOREIGN KEY (idTable) REFERENCES Tables(id)
-- );


-- INSERTAR ROLES
INSERT INTO Role (name, permissions) VALUES ("ADMIN", "{\"admin\": true}");
INSERT INTO Role (name, permissions) VALUES ("MESERO", "{\"admin\": false}");
INSERT INTO Role (name, permissions) VALUES ("COCINA", "{\"admin\": false}");
INSERT INTO Role (name, permissions) VALUES ("MESA", "{\"admin\": false}");

-- INSERTAR USUARIOS
INSERT INTO Users (Username, name, Password, roleId) VALUES ("admin", "admin", "admin", 1);

INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesero 1", "Mesero 1", "mesero1", 2);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesero 2", "Mesero 2", "mesero2", 2);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesero 3", "Mesero 3", "mesero3", 2);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesero 4", "Mesero 4", "mesero4", 2);

INSERT INTO Users (Username, name, Password, roleId) VALUES ("Cocina 1", "Cocina 1", "cocina1", 3);

INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesa 1", "Mesa 1", "mesa1", 4);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesa 2", "Mesa 2", "mesa2", 4);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesa 3", "Mesa 3", "mesa3", 4);
INSERT INTO Users (Username, name, Password, roleId) VALUES ("Mesa 4", "Mesa 4", "mesa4", 4);


-- INSERTAR CATEGORÍAS
INSERT INTO Category (name) VALUES
('Hamburguesas'),
('Pizzas'),
('Tacos'),
('Ensaladas'),
('Platos Fuertes'),
('Pastas'),
('Postres'),
('Bebidas');

-- MENU DE EJEMPLO
INSERT INTO Menu (name, price, description, idCategory) VALUES
('Hamburguesa Clásica', 120.00, 'Pan artesanal, carne de res, lechuga, tomate, queso cheddar y mayonesa', 1),
('Hamburguesa BBQ', 135.00, 'Pan artesanal, carne de res, cebolla caramelizada, tocino, queso cheddar y salsa BBQ', 1),
('Pizza Pepperoni', 180.00, 'Masa crujiente, salsa de tomate, queso mozzarella y pepperoni', 2),
('Pizza Vegetariana', 170.00, 'Masa crujiente, salsa de tomate, queso mozzarella, champiñones, pimientos y aceitunas', 2),
('Tacos al Pastor', 95.00, 'Tres tacos de pastor con piña, cebolla y cilantro', 3),
('Tacos de Bistec', 105.00, 'Tres tacos de bistec con cebolla, cilantro y salsa', 3),
('Ensalada César', 90.00, 'Lechuga romana, crutones, pollo a la parrilla, queso parmesano y aderezo César', 4),
('Pechuga de Pollo a la Plancha', 150.00, 'Pechuga de pollo con guarnición de arroz y ensalada', 5),
('Salmón a la Mantequilla', 250.00, 'Filete de salmón con mantequilla de ajo y puré de papa', 5),
('Pasta Alfredo', 160.00, 'Pasta fetuccini con salsa Alfredo y trozos de pollo', 6),
('Lasagna de Carne', 175.00, 'Capas de pasta con salsa boloñesa, queso ricotta y mozzarella gratinado', 6),
('Pastel de Chocolate', 85.00, 'Pastel de chocolate con ganache y fresas', 7),
('Pay de Limón', 75.00, 'Base de galleta con crema de limón y merengue', 7),
('Cheesecake de Fresa', 95.00, 'Tarta de queso con cobertura de fresa', 7),
('Café Americano', 40.00, 'Café negro recién hecho', 8),
('Café Capuchino', 55.00, 'Espresso con leche espumada y canela', 8),
('Jugo de Naranja', 50.00, 'Jugo natural de naranja recién exprimido', 8),
('Refresco', 35.00, 'Refresco de cola, limón o naranja', 8),
('Cerveza', 60.00, 'Cerveza artesanal o comercial', 8),
('Agua Natural', 25.00, 'Botella de agua natural 500ml', 8),
('Té Helado', 45.00, 'Té negro con hielo y limón', 8),
('Limonada', 55.00, 'Jugo de limón natural con agua mineral o natural', 8),
('Mojito sin alcohol', 70.00, 'Hierbabuena, limón, azúcar y soda', 8);

-- ASIGAR COLORES A TABLA DE CUSTOMIZACION
INSERT INTO Customize (name, color) VALUES
("backgroundColor", "#efc451"),
("textColor", "#0a0909"),
("iconColor", "##fff"),
("colorError", "#ff0000"),
("colorSuccess", "00ff00"),
("headerColor", "#171717"),
("backgroundCard", "#efc451"),
("buttonBackground", "#ffff");
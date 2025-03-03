CREATE DATABASE quickmenu;
USE quickmenu;

-- Tabla de Roles (Admin, Mesera, Cocina, etc.)
CREATE TABLE Role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    permissions LONGTEXT NULL
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

-- Tabla de Menú (Platillos disponibles)
CREATE TABLE Menu (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    available BOOLEAN DEFAULT TRUE
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
    idTable INT,
    FOREIGN KEY (idUser) REFERENCES Users(id),
    FOREIGN KEY (idTable) REFERENCES Users(id)
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
INSERT INTO Role (name) VALUES ("ADMIN");
INSERT INTO Role (name) VALUES ("MESERO");
INSERT INTO Role (name) VALUES ("COCINA");
INSERT INTO Role (name) VALUES ("MESA");

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


-- MENU DE EJEMPLO
INSERT INTO Menu (name, price, description) VALUES
('Hamburguesa Clásica', 120.00, 'Pan artesanal, carne de res, lechuga, tomate, queso cheddar y mayonesa'),
('Hamburguesa BBQ', 135.00, 'Pan artesanal, carne de res, cebolla caramelizada, tocino, queso cheddar y salsa BBQ'),
('Pizza Pepperoni', 180.00, 'Masa crujiente, salsa de tomate, queso mozzarella y pepperoni'),
('Pizza Vegetariana', 170.00, 'Masa crujiente, salsa de tomate, queso mozzarella, champiñones, pimientos y aceitunas'),
('Tacos al Pastor', 95.00, 'Tres tacos de pastor con piña, cebolla y cilantro'),
('Tacos de Bistec', 105.00, 'Tres tacos de bistec con cebolla, cilantro y salsa'),
('Ensalada César', 90.00, 'Lechuga romana, crutones, pollo a la parrilla, queso parmesano y aderezo César'),
('Pechuga de Pollo a la Plancha', 150.00, 'Pechuga de pollo con guarnición de arroz y ensalada'),
('Salmón a la Mantequilla', 250.00, 'Filete de salmón con mantequilla de ajo y puré de papa'),
('Pasta Alfredo', 160.00, 'Pasta fetuccini con salsa Alfredo y trozos de pollo'),
('Pastel de Chocolate', 85.00, 'Pastel de chocolate con ganache y fresas'),
('Pay de Limón', 75.00, 'Base de galleta con crema de limón y merengue'),
('Café Americano', 40.00, 'Café negro recién hecho'),
('Café Capuchino', 55.00, 'Espresso con leche espumada y canela'),
('Jugo de Naranja', 50.00, 'Jugo natural de naranja recién exprimido'),
('Refresco', 35.00, 'Refresco de cola, limón o naranja'),
('Cerveza', 60.00, 'Cerveza artesanal o comercial'),
('Agua Natural', 25.00, 'Botella de agua natural 500ml');
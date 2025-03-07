-- INSERTAR MÁS PEDIDOS (ORDERS)
INSERT INTO Orders (total, status, idTable, idWaitress) VALUES
(540.00, 'Pendiente', 7, 2),
(380.00, 'En Preparación', 8, 2),
(275.00, 'Listo', 9, 3),
(630.00, 'Entregado', 10, 3),
(420.00, 'Pendiente', 7, 4),
(210.00, 'En Preparación', 8, 4),
(345.00, 'Listo', 9, 5),
(490.00, 'Entregado', 10, 5);

-- INSERTAR MÁS DETALLES DE PEDIDOS (ORDERDETAILS)
INSERT INTO OrderDetails (orderId, menuId, quantity, price, status, comments) VALUES
(1, 2, 3, 180.00, 'Pendiente', 'Sin picante'),
(1, 6, 2, 120.00, 'Pendiente', 'Extra queso'),
(2, 4, 1, 150.00, 'En Preparación', NULL),
(2, 7, 2, 230.00, 'En Preparación', 'Sin cebolla'),
(3, 9, 2, 275.00, 'Listo', NULL),
(4, 3, 4, 600.00, 'Entregado', 'Bien cocido'),
(5, 1, 2, 160.00, 'Pendiente', NULL),
(5, 5, 1, 120.00, 'Pendiente', 'Extra tocino'),
(6, 8, 3, 210.00, 'En Preparación', NULL),
(6, 10, 2, 240.00, 'En Preparación', 'Sin guarnición'),
(7, 7, 1, 180.00, 'Listo', 'Sin salsa'),
(8, 6, 3, 490.00, 'Entregado', NULL);

-- INSERTAR MÁS HISTORIAL DE ESTADO DE PEDIDOS (ORDERSTATUSHISTORY)
INSERT INTO OrderStatusHistory (orderId, status, updated_at) VALUES
(1, 'Pendiente', NOW()),
(2, 'Pendiente', NOW()),
(2, 'En Preparación', NOW()),
(3, 'Pendiente', NOW()),
(3, 'En Preparación', NOW()),
(3, 'Listo', NOW()),
(4, 'Pendiente', NOW()),
(4, 'En Preparación', NOW()),
(4, 'Listo', NOW()),
(4, 'Entregado', NOW()),
(5, 'Pendiente', NOW()),
(6, 'Pendiente', NOW()),
(6, 'En Preparación', NOW()),
(7, 'Pendiente', NOW()),
(7, 'En Preparación', NOW()),
(7, 'Listo', NOW()),
(8, 'Pendiente', NOW()),
(8, 'En Preparación', NOW()),
(8, 'Listo', NOW()),
(8, 'Entregado', NOW());

-- INSERTAR MÁS TICKETS
INSERT INTO Tickets (orderId, total, separate) VALUES
(1, 540.00, FALSE),
(2, 380.00, TRUE),
(3, 275.00, FALSE),
(4, 630.00, FALSE),
(5, 420.00, FALSE),
(6, 210.00, TRUE),
(7, 345.00, FALSE),
(8, 490.00, FALSE);

-- ASIGNAR MÁS MESAS A MESEROS (ASSIGNED_TABLES)
INSERT INTO Assigned_Tables (idUser, idTable) VALUES
(2, 7),
(3, 8),
(4, 9),
(5, 10);

-- ASIGAR COLORES A TABLA DE CUSTOMIZACION
INSERT INTO Customize (name, color) VALUES
("backgroundColor", "#efc451"),
("textColor", "#0a0909"),
("iconColor", "##fff"),
("colorError", "#ff0000"),
("colorSuccess", "00ff00"),
("headerColor", "#171717"),
("backgroundCard", "#efc451");


-- INSERTAR MÁS RESERVACIONES (RESERVATIONS)
-- INSERT INTO Reservations (idUser, idTable, date, numClients) VALUES
-- (5, 5, '2024-02-27 19:30:00', 5),
-- (5, 6, '2024-02-27 20:45:00', 3),
-- (6, 7, '2024-02-28 18:00:00', 4),
-- (6, 8, '2024-02-28 21:30:00', 2),
-- (7, 1, '2024-02-29 19:00:00', 6),
-- (7, 2, '2024-02-29 20:15:00', 4),
-- (8, 3, '2024-03-01 18:45:00', 3),
-- (8, 4, '2024-03-01 21:00:00', 5);

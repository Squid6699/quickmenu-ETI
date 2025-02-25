-- INSERTAR MÁS MESAS
INSERT INTO Tables (idUser) VALUES 
(3), -- Mesero 2
(3),
(3),
(3),
(4), -- Mesero 3
(4),
(4),
(4);

-- INSERTAR MÁS PEDIDOS (ORDERS)
INSERT INTO Orders (total, status, idTable, idWaitress) VALUES
(540.00, 'Pendiente', 5, 3),
(380.00, 'En Preparación', 6, 3),
(275.00, 'Listo', 7, 3),
(630.00, 'Entregado', 8, 3),
(420.00, 'Pendiente', 1, 4),
(210.00, 'En Preparación', 2, 4),
(345.00, 'Listo', 3, 4),
(490.00, 'Entregado', 4, 4);

-- INSERTAR MÁS DETALLES DE PEDIDOS (ORDERDETAILS)
INSERT INTO OrderDetails (orderId, menuId, quantity, price, status, comments) VALUES
(5, 2, 3, 180.00, 'Pendiente', 'Sin picante'),
(5, 6, 2, 120.00, 'Pendiente', 'Extra queso'),
(6, 4, 1, 150.00, 'En Preparación', NULL),
(6, 7, 2, 230.00, 'En Preparación', 'Sin cebolla'),
(7, 9, 2, 275.00, 'Listo', NULL),
(8, 3, 4, 600.00, 'Entregado', 'Bien cocido'),
(9, 1, 2, 160.00, 'Pendiente', NULL),
(9, 5, 1, 120.00, 'Pendiente', 'Extra tocino'),
(10, 8, 3, 210.00, 'En Preparación', NULL),
(10, 10, 2, 240.00, 'En Preparación', 'Sin guarnición'),
(11, 7, 1, 180.00, 'Listo', 'Sin salsa'),
(12, 6, 3, 490.00, 'Entregado', NULL);

-- INSERTAR MÁS HISTORIAL DE ESTADO DE PEDIDOS (ORDERSTATUSHISTORY)
INSERT INTO OrderStatusHistory (orderId, status, updated_at) VALUES
(5, 'Pendiente', NOW()),
(6, 'Pendiente', NOW()),
(6, 'En Preparación', NOW()),
(7, 'Pendiente', NOW()),
(7, 'En Preparación', NOW()),
(7, 'Listo', NOW()),
(8, 'Pendiente', NOW()),
(8, 'En Preparación', NOW()),
(8, 'Listo', NOW()),
(8, 'Entregado', NOW()),
(9, 'Pendiente', NOW()),
(10, 'Pendiente', NOW()),
(10, 'En Preparación', NOW()),
(11, 'Pendiente', NOW()),
(11, 'En Preparación', NOW()),
(11, 'Listo', NOW()),
(12, 'Pendiente', NOW()),
(12, 'En Preparación', NOW()),
(12, 'Listo', NOW()),
(12, 'Entregado', NOW());

-- INSERTAR MÁS TICKETS
INSERT INTO Tickets (orderId, total, separate) VALUES
(5, 540.00, FALSE),
(6, 380.00, TRUE),
(7, 275.00, FALSE),
(8, 630.00, FALSE),
(9, 420.00, FALSE),
(10, 210.00, TRUE),
(11, 345.00, FALSE),
(12, 490.00, FALSE);

-- ASIGNAR MÁS MESAS A MESEROS (ASSIGNED_TABLES)
INSERT INTO Assigned_Tables (idUser, idTable) VALUES
(3, 5),
(3, 6),
(3, 7),
(3, 8),
(4, 1),
(4, 2),
(4, 3),
(4, 4);

-- INSERTAR MÁS RESERVACIONES (RESERVATIONS)
INSERT INTO Reservations (idUser, idTable, date, numClients) VALUES
(5, 5, '2024-02-27 19:30:00', 5),
(5, 6, '2024-02-27 20:45:00', 3),
(6, 7, '2024-02-28 18:00:00', 4),
(6, 8, '2024-02-28 21:30:00', 2),
(7, 1, '2024-02-29 19:00:00', 6),
(7, 2, '2024-02-29 20:15:00', 4),
(8, 3, '2024-03-01 18:45:00', 3),
(8, 4, '2024-03-01 21:00:00', 5);

USE vaelo;

INSERT IGNORE INTO admins (email, password, name, role) VALUES
('admin@fast.com', '202526', 'Administrador', 'admin');

INSERT INTO platform_prices (platform_id, price) VALUES
('android', 299),
('androidtv', 349),
('ios', 499),
('samsung', 499),
('lg', 499),
('vidaa', 549),
('titan', 549),
('windows', 399),
('web', 249)
ON DUPLICATE KEY UPDATE price = VALUES(price);

DELETE FROM services;
ALTER TABLE services AUTO_INCREMENT = 1;

INSERT INTO services (name, price, enabled, sort_order) VALUES
('Publicación en Google Play', 'Desde US$199', TRUE, 1),
('Publicación en App Store', 'Desde US$299', TRUE, 2),
('Publicación en Samsung TV', 'Desde US$399', TRUE, 3),
('Publicación en LG Content Store', 'Desde US$399', TRUE, 4),
('Publicación en VIDAA', 'Cotización personalizada', TRUE, 5),
('Panel de administración', 'Desde US$499', TRUE, 6),
('Sistema de banners', 'Desde US$199', TRUE, 7),
('Notificaciones push', 'Desde US$149', TRUE, 8),
('Dominio personalizado', 'Desde US$49/año', TRUE, 9),
('Hosting', 'Desde US$29/mes', TRUE, 10),
('Mantenimiento mensual', 'Desde US$99/mes', TRUE, 11),
('Actualizaciones futuras', 'Desde US$149', TRUE, 12),
('Integración con API personalizada', 'Cotización personalizada', TRUE, 13),
('Migración desde otra aplicación', 'Cotización personalizada', TRUE, 14),
('Diseño exclusivo desde cero', 'Cotización personalizada', TRUE, 15);

INSERT INTO discount_rules (min_platforms, discount_pct) VALUES
(2, 5),
(3, 8),
(4, 12),
(5, 15)
ON DUPLICATE KEY UPDATE discount_pct = VALUES(discount_pct);

INSERT INTO contact_settings (setting_key, setting_value) VALUES
('email', 'ventas@vaelo.com'),
('whatsapp', '+51 999 999 999'),
('country', 'Perú'),
('responseTime', '24 horas')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

INSERT IGNORE INTO quotes
(id, name, company, country, email, whatsapp, clients, platforms, services, app_name, website, status, created_at, subtotal, discount_amount, one_time_total, monthly_total, suggested_deposit, remaining_balance, estimated_total)
VALUES
('Q-1001', 'Carlos Rodriguez', 'MiTV Solutions', NULL, 'carlos@mitv.com', '+52 55 1234 5678', NULL, JSON_ARRAY('androidtv', 'web', 'samsung'), JSON_ARRAY('Panel de administración', 'Hosting'), 'MiTV GO', 'https://mitv.example', 'Nuevo', '2026-07-20', 1347, 108, 1239, 29, 495, 744, 1347),
('Q-1002', 'Ana Torres', 'Stream Plus', NULL, 'ana@streamplus.com', '+51 999 888 777', NULL, JSON_ARRAY('android', 'ios'), JSON_ARRAY('Notificaciones push'), 'Stream Plus', NULL, 'En revision', '2026-07-19', 798, 0, 798, 0, 319, 479, 798);

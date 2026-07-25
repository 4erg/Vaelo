<?php

return [
    "DELETE FROM services",
    "ALTER TABLE services AUTO_INCREMENT = 1",
    "INSERT INTO services (name, price, enabled, sort_order) VALUES
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
    ('Diseño exclusivo desde cero', 'Cotización personalizada', TRUE, 15)",
];

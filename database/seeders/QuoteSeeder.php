<?php

return [
    "INSERT IGNORE INTO quotes
    (id, name, company, country, email, whatsapp, clients, platforms, services, app_name, website, status, created_at, subtotal, discount_amount, one_time_total, monthly_total, suggested_deposit, remaining_balance, estimated_total)
    VALUES
    ('Q-1001', 'Carlos Rodriguez', 'MiTV Solutions', NULL, 'carlos@mitv.com', '+52 55 1234 5678', NULL, JSON_ARRAY('androidtv', 'web', 'samsung'), JSON_ARRAY('Panel de administración', 'Hosting'), 'MiTV GO', 'https://mitv.example', 'Nuevo', '2026-07-20', 1347, 108, 1239, 29, 495, 744, 1347),
    ('Q-1002', 'Ana Torres', 'Stream Plus', NULL, 'ana@streamplus.com', '+51 999 888 777', NULL, JSON_ARRAY('android', 'ios'), JSON_ARRAY('Notificaciones push'), 'Stream Plus', NULL, 'En revision', '2026-07-19', 798, 0, 798, 0, 319, 479, 798)",
];

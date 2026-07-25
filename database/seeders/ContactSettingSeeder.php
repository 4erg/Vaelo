<?php

return [
    "INSERT INTO contact_settings (setting_key, setting_value) VALUES
    ('email', 'ventas@vaelo.com'),
    ('whatsapp', '+51 999 999 999'),
    ('country', 'Perú'),
    ('responseTime', '24 horas')
    ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
];

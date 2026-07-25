<?php

return [
    "INSERT INTO platform_prices (platform_id, price) VALUES
    ('android', 299),
    ('androidtv', 349),
    ('ios', 499),
    ('samsung', 499),
    ('lg', 499),
    ('vidaa', 549),
    ('titan', 549),
    ('windows', 399),
    ('web', 249)
    ON DUPLICATE KEY UPDATE price = VALUES(price)",
];

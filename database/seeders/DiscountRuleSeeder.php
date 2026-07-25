<?php

return [
    "INSERT INTO discount_rules (min_platforms, discount_pct) VALUES
    (2, 5),
    (3, 8),
    (4, 12),
    (5, 15)
    ON DUPLICATE KEY UPDATE discount_pct = VALUES(discount_pct)",
];

<?php

return [
    "CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(190) NOT NULL UNIQUE,
        password VARCHAR(190) NOT NULL,
        name VARCHAR(190) NOT NULL,
        role VARCHAR(80) NOT NULL DEFAULT 'admin',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )",
    "CREATE TABLE IF NOT EXISTS platform_prices (
        platform_id VARCHAR(80) PRIMARY KEY,
        price DECIMAL(10,2) NOT NULL
    )",
    "CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(190) NOT NULL,
        price VARCHAR(190) NOT NULL,
        enabled BOOLEAN NOT NULL DEFAULT TRUE,
        sort_order INT NOT NULL DEFAULT 0
    )",
    "CREATE TABLE IF NOT EXISTS discount_rules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        min_platforms INT NOT NULL UNIQUE,
        discount_pct DECIMAL(5,2) NOT NULL
    )",
    "CREATE TABLE IF NOT EXISTS contact_settings (
        setting_key VARCHAR(80) PRIMARY KEY,
        setting_value VARCHAR(255) NOT NULL
    )",
    "CREATE TABLE IF NOT EXISTS quotes (
        id VARCHAR(40) PRIMARY KEY,
        name VARCHAR(190) NOT NULL,
        company VARCHAR(190) NOT NULL,
        country VARCHAR(120),
        email VARCHAR(190),
        whatsapp VARCHAR(80),
        clients VARCHAR(120),
        platforms JSON NOT NULL,
        services JSON,
        iptv_panel VARCHAR(80),
        store_publish VARCHAR(80),
        admin_panel VARCHAR(80),
        budget VARCHAR(120),
        description TEXT,
        app_name VARCHAR(190),
        website VARCHAR(255),
        desired_delivery VARCHAR(120),
        logo_name VARCHAR(190),
        subtotal DECIMAL(10,2),
        discount_amount DECIMAL(10,2),
        monthly_total DECIMAL(10,2),
        one_time_total DECIMAL(10,2),
        suggested_deposit DECIMAL(10,2),
        remaining_balance DECIMAL(10,2),
        status VARCHAR(80) NOT NULL DEFAULT 'Nuevo',
        created_at DATE NOT NULL,
        estimated_total DECIMAL(10,2) NOT NULL DEFAULT 0
    )",
];

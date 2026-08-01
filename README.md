# VAELO

VAELO es una web comercial para vender desarrollo de aplicaciones IPTV white-label. El objetivo del proyecto es presentar servicios de creación de apps personalizadas para Android, Android TV, iPhone/iPad, Smart TV, Windows y web, permitiendo que un cliente cotice su propio paquete multiplataforma.

La plataforma muestra precios base por sistema operativo, servicios adicionales, comparación de funcionalidades, proceso de trabajo, preguntas frecuentes y un formulario de cotización. También incluye un panel administrativo básico para revisar solicitudes, modificar precios, activar servicios y actualizar datos de contacto.

## Funcionalidades principales

- Landing page comercial para servicios IPTV white-label.
- Catálogo de plataformas: Android, Android TV, iOS, Samsung TV, LG TV, VIDAA, Titan OS, Windows y web.
- Cotizador con selección de plataformas, servicios y descuentos automáticos.
- Formulario de contacto/cotización con guardado local y envío preparado para WhatsApp.
- Secciones de confianza, casos de uso, personalización, proceso y FAQ.
- Panel admin para gestionar cotizaciones, precios, servicios y datos comerciales.
- Diseño responsive con React, Vite y Tailwind CSS.

## Tecnologías

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Express
- MySQL opcional mediante `mysql2`

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run dev:api
npm run start
```

En Figma Make el servidor de Vite normalmente ya está corriendo en el puerto configurado por `$PORT`.

## Estructura

- `src/App.tsx`: aplicación principal, rutas, secciones públicas, cotizador y panel admin.
- `src/index.css`: estilos globales, layout responsive, componentes visuales y animaciones.
- `public/`: logos, mockups e imágenes comerciales de plataformas.
- `server/`: API Express para persistencia.
- `database/`: migraciones y seeders relacionados con datos del proyecto.

## Panel Administrativo

Rutas principales:

- `/admin/login`: acceso al panel.
- `/admin`: dashboard administrativo.

Desde el panel se pueden revisar solicitudes, cambiar estados, editar precios de plataformas, activar o desactivar servicios adicionales y actualizar datos de contacto como correo, WhatsApp, país y tiempo de respuesta.

## Nota Comercial

VAELO desarrolla únicamente el software y la interfaz de las aplicaciones. El cliente es responsable de contar con licencias, permisos y derechos sobre el contenido que distribuye en sus servicios IPTV.

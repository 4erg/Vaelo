import { useState, useEffect } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    id: 'android',
    name: 'Android Móvil',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M6.18 15.64a2.18 2.18 0 0 1-2.18 2.18C2.98 17.82 2 16.84 2 15.64V10h4.18zM14 19c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-1h4zM7 9H5v6h2zm12 0h-2v6h2zm-9-6.27V4c0-.55.45-1 1-1s1 .45 1 1v.73C14.42 5.13 16 6.92 16 9H8c0-2.08 1.58-3.87 3.64-4.27zM17.82 15.64a2.18 2.18 0 0 1-2.18 2.18V10H20v5.64z"/>
      </svg>
    ),
    color: '#3DDC84',
    price: 299,
    description: 'Aplicación para teléfonos y tablets Android.',
    features: ['Aplicación personalizada', 'Nombre y logotipo del cliente', 'Colores corporativos', 'Canales en vivo', 'Películas y series', 'Reproductor integrado', 'APK o publicación en Google Play'],
    cta: 'Elegir Android',
  },
  {
    id: 'androidtv',
    name: 'Android TV',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5l-1 1v1h8v-1l-1-1h5c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H3V5h18v10z"/>
        <circle cx="8" cy="10" r="1.5"/>
        <path d="M13 8h5v1h-5zm0 2h5v1h-5zm0 2h3v1h-3z"/>
      </svg>
    ),
    color: '#3DDC84',
    price: 349,
    description: 'Aplicación optimizada para televisores, TV Box y dispositivos con Android TV o Google TV.',
    features: ['Navegación con control remoto', 'Diseño para pantalla grande', 'Reproductor integrado', 'Canales, películas y series', 'Personalización completa', 'APK para instalación directa'],
    cta: 'Elegir Android TV',
  },
  {
    id: 'ios',
    name: 'iPhone y iPad',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
      </svg>
    ),
    color: '#A8B5C1',
    price: 499,
    description: 'Aplicación IPTV personalizada para dispositivos Apple con iOS y iPadOS.',
    features: ['Diseño adaptado para iPhone y iPad', 'Reproductor compatible', 'Personalización de marca', 'Preparación para App Store', 'Configuración de cuenta de desarrollador por separado'],
    cta: 'Elegir iOS',
  },
  {
    id: 'samsung',
    name: 'Samsung Smart TV',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
      </svg>
    ),
    color: '#1428A0',
    price: 599,
    description: 'Aplicación para televisores Samsung compatibles con Tizen OS.',
    features: ['Navegación con control remoto', 'Interfaz para televisores', 'Integración con servidor IPTV', 'Preparación para Samsung Apps TV', 'Revisión de compatibilidad'],
    cta: 'Elegir Samsung TV',
  },
  {
    id: 'lg',
    name: 'LG Smart TV',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
        <path d="M7 8h2v6H7zm4 0h2v2h2v2h-4V8z"/>
      </svg>
    ),
    color: '#A50034',
    price: 599,
    description: 'Aplicación IPTV para televisores LG con webOS.',
    features: ['Diseño para pantalla grande', 'Compatibilidad con control remoto', 'Reproductor optimizado', 'Preparación para LG Content Store', 'Revisión de compatibilidad'],
    cta: 'Elegir LG TV',
  },
  {
    id: 'vidaa',
    name: 'VIDAA OS',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
        <path d="M12 7l-4 8h3v2h2v-2h3z"/>
      </svg>
    ),
    color: '#FF6B35',
    price: 449,
    description: 'Aplicación para televisores Hisense y otras marcas que utilizan VIDAA OS.',
    features: ['Diseño personalizado', 'Navegación para Smart TV', 'Integración IPTV', 'Preparación para tienda VIDAA', 'Compatibilidad sujeta al modelo'],
    cta: 'Elegir VIDAA',
  },
  {
    id: 'titan',
    name: 'Titan OS',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12z"/>
        <path d="M10 7h4v2h-1v6h-2V9h-1z"/>
      </svg>
    ),
    color: '#6C63FF',
    price: 449,
    description: 'Aplicación para televisores compatibles con Titan OS.',
    features: ['Diseño adaptado para televisión', 'Marca personalizada', 'Integración con API o servidor IPTV', 'Evaluación de publicación en la plataforma'],
    cta: 'Elegir Titan OS',
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M3 12V6.75l6-1.32v6.57H3zm17 0V3.75l-9 1.97V12h9zM3 13h6v6.06L3 17.76V13zm17 0h-9v6.71l9 1.98V13z"/>
      </svg>
    ),
    color: '#0078D4',
    price: 299,
    description: 'Aplicación de escritorio para computadoras y laptops Windows.',
    features: ['Instalador personalizado', 'Reproductor integrado', 'Pantalla completa', 'Actualizaciones', 'Logo, nombre y colores personalizados'],
    cta: 'Elegir Windows',
  },
  {
    id: 'web',
    name: 'Aplicación Web',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
    ),
    color: '#00CFFF',
    price: 399,
    description: 'Plataforma IPTV accesible desde un navegador web.',
    features: ['Diseño responsive', 'Acceso mediante dominio personalizado', 'Compatible con todos los dispositivos', 'Panel de administración opcional', 'Reproductor web'],
    cta: 'Elegir Web',
  },
]

const COMPARISON_FEATURES = [
  'Aplicación personalizada',
  'Canales en vivo',
  'Películas y series',
  'Guía EPG',
  'Control parental',
  'Favoritos',
  'Inicio de sesión',
  'Publicación en tienda',
  'Instalación mediante archivo',
  'Control remoto',
  'Pantallas táctiles',
  'Actualizaciones',
  'Panel de administración',
]

// true = sí, 'partial' = opcional, false = no
const COMPARISON_DATA: Record<string, (boolean | 'partial')[]> = {
  android:    [true, true, true, true, true, true, true, 'partial', true, false, true, true, 'partial'],
  androidtv:  [true, true, true, true, true, true, true, 'partial', true, true, false, true, 'partial'],
  ios:        [true, true, true, true, true, true, true, 'partial', false, false, true, true, 'partial'],
  samsung:    [true, true, true, true, true, true, true, 'partial', false, true, false, true, false],
  lg:         [true, true, true, true, true, true, true, 'partial', false, true, false, true, false],
  vidaa:      [true, true, true, 'partial', true, true, true, 'partial', false, true, false, true, false],
  titan:      [true, true, true, 'partial', true, true, true, 'partial', false, true, false, true, false],
  windows:    [true, true, true, true, true, true, true, false, true, false, false, true, 'partial'],
  web:        [true, true, true, true, true, true, true, false, false, false, true, true, 'partial'],
}

const FAQS = [
  { q: '¿Cada plataforma tiene un precio diferente?', a: 'Sí. Cada sistema operativo requiere un desarrollo específico con tecnologías distintas, por lo que cada plataforma tiene su propio precio base.' },
  { q: '¿Obtengo descuento si compro varias aplicaciones?', a: 'Sí. Al contratar 3 o más plataformas se aplica un descuento automático del 10%. Con 5 o más plataformas el descuento es del 15%, y con 7 o más del 20%.' },
  { q: '¿Puedo empezar solo con Android TV?', a: 'Por supuesto. Puedes contratar una sola plataforma y agregar más en el futuro a precio regular.' },
  { q: '¿Después puedo agregar Samsung o LG?', a: 'Sí. Las plataformas adicionales se pueden incorporar en cualquier momento sin necesidad de rehcer el trabajo ya realizado.' },
  { q: '¿El precio incluye la publicación en las tiendas?', a: 'La publicación en tiendas (Google Play, App Store, Samsung TV, etc.) es un servicio adicional con costo separado, ya que implica procesos externos a nuestro control.' },
  { q: '¿Necesito una cuenta de desarrollador?', a: 'Para publicar en tiendas oficiales (Google Play, App Store, Samsung) el cliente debe contar con su propia cuenta de desarrollador. Podemos orientarte en el proceso.' },
  { q: '¿La aplicación tendrá mi nombre y logotipo?', a: 'Sí. La aplicación se desarrolla completamente con la identidad de tu empresa: nombre, ícono, colores, pantalla de carga y todos los elementos visuales.' },
  { q: '¿Se puede conectar con cualquier panel IPTV?', a: 'Compatible con la mayoría de paneles IPTV del mercado. Evaluamos la integración durante la etapa de análisis del proyecto.' },
  { q: '¿Incluyen contenido, canales, películas o series?', a: 'No. Desarrollamos únicamente el software y la interfaz. El cliente es responsable del contenido y las licencias correspondientes.' },
  { q: '¿Cuánto demora el desarrollo?', a: 'Depende de las plataformas y el nivel de personalización. Un proyecto típico de 2-3 plataformas demora entre 4 y 8 semanas.' },
  { q: '¿Ofrecen mantenimiento mensual?', a: 'Sí. Contamos con planes de mantenimiento que incluyen actualizaciones, corrección de errores y soporte técnico. Consulta precios por separado.' },
  { q: '¿Qué ocurre si una tienda rechaza la aplicación?', a: 'Revisamos el motivo del rechazo y realizamos los ajustes necesarios. Si el rechazo es por políticas de contenido, es responsabilidad del cliente adecuarse a esas normas.' },
]

const ADDITIONAL_SERVICES = [
  { name: 'Publicación en Google Play', price: 'Desde US$199' },
  { name: 'Publicación en App Store', price: 'Desde US$299' },
  { name: 'Publicación en Samsung TV', price: 'Desde US$399' },
  { name: 'Publicación en LG Content Store', price: 'Desde US$399' },
  { name: 'Publicación en VIDAA', price: 'Cotización personalizada' },
  { name: 'Panel de administración', price: 'Desde US$499' },
  { name: 'Sistema de banners', price: 'Desde US$199' },
  { name: 'Notificaciones push', price: 'Desde US$149' },
  { name: 'Dominio personalizado', price: 'Desde US$49/año' },
  { name: 'Hosting', price: 'Desde US$29/mes' },
  { name: 'Mantenimiento mensual', price: 'Desde US$99/mes' },
  { name: 'Actualizaciones futuras', price: 'Desde US$149' },
  { name: 'Integración con API personalizada', price: 'Cotización personalizada' },
  { name: 'Migración desde otra aplicación', price: 'Cotización personalizada' },
  { name: 'Diseño exclusivo desde cero', price: 'Cotización personalizada' },
]

const ADMIN_SESSION_KEY = 'vaelo_admin_session'
const LOCAL_DB_KEY = 'vaelo_local_db'
const QUOTE_DRAFT_KEY = 'vaelo_quote_draft'

type LocalAdmin = {
  email: string
  password: string
  name: string
  role: string
}

type LocalQuote = {
  id: string
  name: string
  company: string
  country?: string
  email: string
  whatsapp: string
  clients?: string
  platforms: string[]
  services?: string[]
  iptv_panel?: string
  store_publish?: string
  admin_panel?: string
  budget?: string
  description?: string
  appName?: string
  website?: string
  desiredDelivery?: string
  logoName?: string
  subtotal?: number
  discountAmount?: number
  monthlyTotal?: number
  oneTimeTotal?: number
  suggestedDeposit?: number
  remainingBalance?: number
  status: string
  createdAt: string
  estimatedTotal: number
}

type DiscountRule = {
  minPlatforms: number
  discountPct: number
}

type LocalDb = {
  admins: LocalAdmin[]
  quotes: LocalQuote[]
  platformPrices: Record<string, number>
  services: { name: string; price: string; enabled: boolean }[]
  discountRules: DiscountRule[]
  contactSettings: {
    email: string
    whatsapp: string
    country: string
    responseTime: string
  }
}

type QuoteFormState = {
  name: string
  company: string
  country: string
  email: string
  whatsapp: string
  appName: string
  website: string
  clients: string
  platforms: string[]
  services: string[]
  iptv_panel: string
  store_publish: string
  admin_panel: string
  budget: string
  desiredDelivery: string
  description: string
  privacyAccepted: boolean
  logoName: string
}

type QuoteTextFieldKey = Exclude<keyof QuoteFormState, 'platforms' | 'services' | 'privacyAccepted'>

let cachedDb: LocalDb | null = null

async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
  })
  if (!response.ok) throw new Error(`API ${path} failed`)
  return response.json() as Promise<T>
}

async function loadRemoteDb() {
  const db = await apiRequest<LocalDb>('/api/db')
  cachedDb = db
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(db))
  window.dispatchEvent(new CustomEvent('vaelo-db-updated'))
  return db
}

function persistRemoteDb(db: LocalDb) {
  void apiRequest('/api/db', { method: 'PUT', body: JSON.stringify(db) }).catch(error => {
    console.error('No se pudo guardar en MySQL', error)
  })
}

function persistRemoteQuote(quote: LocalQuote) {
  void apiRequest('/api/quotes', { method: 'POST', body: JSON.stringify(quote) }).catch(error => {
    console.error('No se pudo guardar la cotizacion en MySQL', error)
  })
}

const PLATFORM_SLUGS: Record<string, string> = {
  android: 'android',
  androidtv: 'android-tv',
  ios: 'ios',
  samsung: 'samsung-tv',
  lg: 'lg-tv',
  vidaa: 'vidaa',
  titan: 'titan-os',
  windows: 'windows',
  web: 'web',
}

function getPlatformPath(id: string) {
  return `/plataformas/${PLATFORM_SLUGS[id] ?? id}`
}

function getManagedPlatforms() {
  const db = getLocalDb()
  return PLATFORMS.map(platform => ({
    ...platform,
    price: db.platformPrices[platform.id] ?? platform.price,
  }))
}

function getManagedServices() {
  return getLocalDb().services.filter(service => service.enabled)
}

function getPlatformBySlug(slug: string) {
  return getManagedPlatforms().find(platform => PLATFORM_SLUGS[platform.id] === slug)
}

function getPlatformCategory(id: string) {
  if (id.includes('tv') || ['samsung', 'lg', 'vidaa', 'titan'].includes(id)) return 'Smart TV'
  if (id === 'web') return 'Web'
  if (id === 'windows') return 'Escritorio'
  return 'Movil'
}

function getPlatformTimeline(id: string) {
  if (['samsung', 'lg'].includes(id)) return '6 a 9 semanas'
  if (['vidaa', 'titan'].includes(id)) return '5 a 7 semanas'
  if (id === 'ios') return '5 a 8 semanas'
  if (id === 'web') return '3 a 5 semanas'
  return '4 a 6 semanas'
}

function getPlatformPublishing(id: string) {
  if (id === 'android') return ['APK directa', 'Google Play opcional']
  if (id === 'androidtv') return ['APK para TV/box', 'Google Play opcional']
  if (id === 'ios') return ['App Store', 'Distribucion privada o TestFlight']
  if (id === 'windows') return ['Instalador EXE/MSIX', 'Distribucion directa']
  if (id === 'web') return ['Dominio propio', 'Hosting administrado opcional']
  if (id === 'samsung') return ['Samsung Seller Office', 'Carga por certificado']
  if (id === 'lg') return ['LG Seller Lounge', 'Distribucion por tienda']
  if (id === 'vidaa') return ['Tienda VIDAA', 'Evaluacion por fabricante']
  return ['Distribucion por plataforma', 'Revision tecnica previa']
}

function getPlatformRequirements(platform: typeof PLATFORMS[0]) {
  return [
    'Nombre comercial definitivo y version de marca.',
    'Logotipo en buena resolucion y colores corporativos.',
    `Accesos tecnicos o documentacion del servidor para ${platform.name}.`,
    'Definicion de secciones clave: canales, peliculas, series, soporte y contacto.',
  ]
}

function getPlatformFaq(platform: typeof PLATFORMS[0]) {
  return [
    {
      q: `La aplicacion de ${platform.name} queda con mi marca?`,
      a: 'Si. El entregable se adapta a tu nombre, icono, colores y estructura base de contenido.',
    },
    {
      q: 'El precio incluye publicacion en tienda?',
      a: 'No siempre. La publicacion puede requerir un servicio adicional y cuentas externas a nombre del cliente.',
    },
    {
      q: 'Puedo sumar otras plataformas despues?',
      a: 'Si. Podemos empezar con una plataforma y extender el mismo proyecto a otras compatibles.',
    },
  ]
}

function getRecommendedServicesForPlatform(platform: typeof PLATFORMS[0]) {
  const services = getManagedServices().slice(0, 6)
  return services.filter(service => {
    if (platform.id === 'web') return !service.name.toLowerCase().includes('app store')
    if (platform.id === 'windows') return !service.name.toLowerCase().includes('google play')
    return true
  }).slice(0, 4)
}

function defaultDiscountRules(): DiscountRule[] {
  return [
    { minPlatforms: 2, discountPct: 5 },
    { minPlatforms: 3, discountPct: 8 },
    { minPlatforms: 4, discountPct: 12 },
    { minPlatforms: 5, discountPct: 15 },
  ]
}

function parseServicePrice(price: string) {
  const match = price.replace(',', '').match(/(\d+(?:\.\d+)?)/)
  return match ? Number(match[1]) : 0
}

function isRecurringService(serviceName: string, price: string) {
  const text = `${serviceName} ${price}`.toLowerCase()
  return text.includes('/mes') || text.includes('mensual') || text.includes('/a') || text.includes('hosting')
}

function getAppliedDiscount(count: number, rules: DiscountRule[]) {
  return rules
    .filter(rule => count >= rule.minPlatforms)
    .sort((a, b) => b.minPlatforms - a.minPlatforms)[0]?.discountPct ?? 0
}

function buildQuoteEstimate(platformIds: string[], serviceNames: string[]) {
  const db = getLocalDb()
  const platforms = getManagedPlatforms().filter(platform => platformIds.includes(platform.id))
  const services = db.services.filter(service => service.enabled && serviceNames.includes(service.name))
  const platformSubtotal = platforms.reduce((sum, platform) => sum + platform.price, 0)
  const discountPct = getAppliedDiscount(platforms.length, db.discountRules)
  const discountAmount = Math.round(platformSubtotal * (discountPct / 100))
  const discountedPlatforms = platformSubtotal - discountAmount
  const monthlyTotal = services
    .filter(service => isRecurringService(service.name, service.price))
    .reduce((sum, service) => sum + parseServicePrice(service.price), 0)
  const oneTimeServices = services
    .filter(service => !isRecurringService(service.name, service.price))
    .reduce((sum, service) => sum + parseServicePrice(service.price), 0)
  const oneTimeTotal = discountedPlatforms + oneTimeServices
  const estimatedTotal = oneTimeTotal + monthlyTotal
  const suggestedDeposit = Math.round(oneTimeTotal * 0.4)

  return {
    platforms,
    services,
    platformSubtotal,
    discountPct,
    discountAmount,
    discountedPlatforms,
    monthlyTotal,
    oneTimeServices,
    oneTimeTotal,
    estimatedTotal,
    suggestedDeposit,
    remainingBalance: Math.max(oneTimeTotal - suggestedDeposit, 0),
  }
}

function getQuoteDraft() {
  const raw = sessionStorage.getItem(QUOTE_DRAFT_KEY)
  return raw ? JSON.parse(raw) as { platforms: string[]; services: string[] } : null
}

function saveQuoteDraft(platforms: string[], services: string[]) {
  sessionStorage.setItem(QUOTE_DRAFT_KEY, JSON.stringify({ platforms, services }))
}

function clearQuoteDraft() {
  sessionStorage.removeItem(QUOTE_DRAFT_KEY)
}

function seedLocalDb(): LocalDb {
  if (cachedDb) return cachedDb
  const existing = localStorage.getItem(LOCAL_DB_KEY)
  if (existing) {
    const parsed = JSON.parse(existing) as Partial<LocalDb>
    const migrated: LocalDb = {
      admins: parsed.admins ?? [],
      quotes: parsed.quotes ?? [],
      platformPrices: parsed.platformPrices ?? Object.fromEntries(PLATFORMS.map(platform => [platform.id, platform.price])),
      services: parsed.services ?? ADDITIONAL_SERVICES.map(service => ({ ...service, enabled: true })),
      discountRules: parsed.discountRules ?? defaultDiscountRules(),
      contactSettings: parsed.contactSettings ?? {
        email: 'ventas@vaelo.com',
        whatsapp: '+51 999 999 999',
        country: 'Perú',
        responseTime: '24 horas',
      },
    }
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(migrated))
    cachedDb = migrated
    return migrated
  }

  const db: LocalDb = {
    admins: [
      {
        email: 'admin@fast.com',
        password: '202526',
        name: 'Administrador',
        role: 'admin',
      },
    ],
    platformPrices: Object.fromEntries(PLATFORMS.map(platform => [platform.id, platform.price])),
    services: ADDITIONAL_SERVICES.map(service => ({ ...service, enabled: true })),
    discountRules: defaultDiscountRules(),
    contactSettings: {
      email: 'ventas@vaelo.com',
      whatsapp: '+51 999 999 999',
      country: 'Perú',
      responseTime: '24 horas',
    },
    quotes: [
      {
        id: 'Q-1001',
        name: 'Carlos Rodriguez',
        company: 'MiTV Solutions',
        email: 'carlos@mitv.com',
        whatsapp: '+52 55 1234 5678',
        platforms: ['androidtv', 'web', 'samsung'],
        services: ['Panel de administraciÃ³n', 'Hosting'],
        appName: 'MiTV GO',
        website: 'https://mitv.example',
        status: 'Nuevo',
        createdAt: '2026-07-20',
        subtotal: 1347,
        discountAmount: 108,
        oneTimeTotal: 1239,
        monthlyTotal: 29,
        suggestedDeposit: 495,
        remainingBalance: 744,
        estimatedTotal: 1347,
      },
      {
        id: 'Q-1002',
        name: 'Ana Torres',
        company: 'Stream Plus',
        email: 'ana@streamplus.com',
        whatsapp: '+51 999 888 777',
        platforms: ['android', 'ios'],
        services: ['Notificaciones push'],
        appName: 'Stream Plus',
        status: 'En revision',
        createdAt: '2026-07-19',
        subtotal: 798,
        discountAmount: 0,
        oneTimeTotal: 798,
        monthlyTotal: 0,
        suggestedDeposit: 319,
        remainingBalance: 479,
        estimatedTotal: 798,
      },
    ],
  }

  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(db))
  cachedDb = db
  return db
}

function getLocalDb(): LocalDb {
  return seedLocalDb()
}

function saveLocalQuote(quote: Omit<LocalQuote, 'id' | 'createdAt' | 'status'>) {
  const db = getLocalDb()
  const nextNumber = db.quotes
    .map(item => Number(item.id.replace(/[^0-9]/g, '')))
    .filter(Number.isFinite)
    .reduce((max, value) => Math.max(max, value), 1000) + 1
  const nextQuote: LocalQuote = {
    ...quote,
    id: `VAELO-Q-${nextNumber}`,
    status: 'Nuevo',
    createdAt: new Date().toISOString().slice(0, 10),
  }
  const nextDb = { ...db, quotes: [nextQuote, ...db.quotes] }
  cachedDb = nextDb
  localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(nextDb))
  persistRemoteQuote(nextQuote)
  return nextQuote
}

function setAdminSession(email: string) {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ email, loggedAt: new Date().toISOString() }))
}

function clearAdminSession() {
  localStorage.removeItem(ADMIN_SESSION_KEY)
}

function getAdminSession() {
  const value = localStorage.getItem(ADMIN_SESSION_KEY)
  return value ? JSON.parse(value) as { email: string; loggedAt: string } : null
}

// ─── Components ──────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center">
      <img src="/imgs/vaelo_logo.png" alt="VAELO" className="h-14 w-auto object-contain" />
    </div>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Inicio', href: '/' },
    { label: 'Plataformas', href: '/plataformas' },
    { label: 'Personalización', href: '/personalizacion' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Precios', href: '/precios' },
    { label: 'Proceso', href: '/proceso' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contacto', href: '/contacto' },
  ]
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
  const navStyle = (href: string) => isActive(href) ? { color: '#2B7FFF' } : undefined

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid #E8EEF8',
        boxShadow: scrolled ? '0 2px 16px rgba(13,27,62,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-20">
        <Logo />

        <div className="hidden xl:flex items-center gap-5">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link" style={navStyle(l.href)}>{l.label}</a>
          ))}
        </div>

        <div className="hidden xl:block">
          <div className="flex items-center gap-3">
            <a href="/admin/login" className="nav-link" style={pathname.startsWith('/admin') ? { color: '#2B7FFF' } : undefined}>Admin</a>
            <a href="/contacto" className="btn-primary px-5 py-2 rounded-lg text-sm text-white">
              <span>Solicitar cotización</span>
            </a>
          </div>
        </div>

        <button
          className="xl:hidden p-2"
          style={{ color: '#0D1B3E' }}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: open ? 'rotate(45deg) translateY(6px)' : '' }} />
          <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: open ? 0 : 1 }} />
          <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: open ? 'rotate(-45deg) translateY(-6px)' : '' }} />
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t px-5 py-4 space-y-2 shadow-2xl" style={{ background: 'rgba(255,255,255,0.98)', borderColor: '#E8EEF8' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} className="block nav-link py-2" style={navStyle(l.href)} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <a href="/contacto" className="btn-primary block text-center px-5 py-2.5 rounded-lg text-sm text-white mt-4">
            <span>Solicitar cotización</span>
          </a>
          <a href="/admin/login" className="block nav-link py-2 text-center" style={pathname.startsWith('/admin') ? { color: '#2B7FFF' } : undefined}>Admin</a>
        </div>
      )}
    </nav>
  )
}

function DeviceMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto" style={{ height: 380 }}>
      {/* TV */}
      <div className="absolute animate-float" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', animationDelay: '0s' }}>
        <div className="rounded-xl overflow-hidden" style={{ width: 220, background: '#fff', boxShadow: '0 8px 40px rgba(43,127,255,0.18)', border: '1.5px solid #E8EEF8' }}>
          <div className="px-2 pt-2" style={{ background: '#F4F7FF' }}>
            <div className="rounded-lg overflow-hidden" style={{ height: 110, background: '#EEF2FF' }}>
              <div className="flex h-full">
                <div className="w-1/3 border-r p-2 space-y-1" style={{ borderColor: '#E2E8F8' }}>
                  {['Inicio','Canales','Pelí.','Series','Config.'].map(t => (
                    <div key={t} className="text-xs px-2 py-1 rounded font-display font-500" style={{ background: t==='Canales' ? '#2B7FFF' : 'transparent', color: t==='Canales' ? '#fff' : '#8899BB' }}>{t}</div>
                  ))}
                </div>
                <div className="flex-1 p-2">
                  <div className="text-xs mb-1.5 font-display font-600" style={{ color: '#2B7FFF' }}>EN VIVO</div>
                  <div className="grid grid-cols-2 gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="rounded" style={{ height: 36, background: '#D8E4FF', border: '1px solid #C5D5F5' }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center py-1.5">
            <div className="w-16 h-1 rounded-full" style={{ background: '#D0D8EE' }} />
          </div>
        </div>
        <div className="mx-auto mt-1 rounded-b" style={{ width: 30, height: 12, background: '#E2E8F8', borderBottom: '3px solid #CBD5E8' }} />
      </div>

      {/* Phone left */}
      <div className="absolute animate-float" style={{ bottom: 20, left: 20, animationDelay: '1s' }}>
        <div className="rounded-2xl overflow-hidden" style={{ width: 90, height: 160, background: '#fff', boxShadow: '0 8px 30px rgba(43,127,255,0.14)', border: '1.5px solid #E8EEF8' }}>
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: '#D0D8EE' }} />
          </div>
          <div className="px-2 space-y-1">
            <div className="rounded text-center py-1.5" style={{ background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' }}>
              <div className="text-white font-display font-700" style={{ fontSize: 8 }}>VAELO</div>
            </div>
            {[1,2,3].map(i => (
              <div key={i} className="rounded flex items-center gap-1 px-1 py-1" style={{ background: '#F4F7FF' }}>
                <div className="rounded flex-shrink-0" style={{ width: 18, height: 18, background: '#D8E4FF' }} />
                <div className="flex-1 space-y-0.5">
                  <div className="rounded" style={{ height: 3, width: '70%', background: '#C5D5F5' }} />
                  <div className="rounded" style={{ height: 2, width: '50%', background: '#E2E8F8' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet right */}
      <div className="absolute animate-float" style={{ bottom: 20, right: 10, animationDelay: '2s' }}>
        <div className="rounded-xl overflow-hidden" style={{ width: 130, height: 95, background: '#fff', boxShadow: '0 8px 30px rgba(43,127,255,0.12)', border: '1.5px solid #E8EEF8' }}>
          <div className="p-2" style={{ background: '#F4F7FF' }}>
            <div className="flex gap-1 mb-1.5">
              {['Inicio','Canales','Perfil'].map((t,i) => (
                <div key={t} className="rounded px-1.5 py-0.5 font-display font-600" style={{ fontSize: 6, background: i===1 ? '#2B7FFF' : 'transparent', color: i===1 ? '#fff' : '#8899BB' }}>{t}</div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="rounded" style={{ height: 32, background: '#D8E4FF', border: '1px solid #C5D5F5' }} />
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center" style={{ height: 12 }}>
            <div className="rounded-full" style={{ width: 6, height: 6, background: '#C5D5F5' }} />
          </div>
        </div>
      </div>

      {/* Laptop */}
      <div className="absolute animate-float" style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', animationDelay: '0.5s' }}>
        <div>
          <div className="rounded-t-xl overflow-hidden" style={{ width: 160, height: 100, background: '#fff', boxShadow: '0 8px 30px rgba(43,127,255,0.12)', border: '1.5px solid #E8EEF8' }}>
            <div className="flex h-full">
              <div className="border-r p-1.5 space-y-1" style={{ width: 40, borderColor: '#E8EEF8', background: '#F4F7FF' }}>
                {['▶','📋','⭐','👤'].map(i => (
                  <div key={i} className="text-center" style={{ fontSize: 10 }}>{i}</div>
                ))}
              </div>
              <div className="flex-1 p-1.5">
                <div className="rounded mb-1.5" style={{ height: 40, background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' }}>
                  <div className="flex items-end h-full p-1">
                    <div className="text-white font-display font-700" style={{ fontSize: 7 }}>► En vivo ahora</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="rounded" style={{ height: 28, background: '#EEF2FF' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: 4, background: '#E2E8F8', borderBottom: '2px solid #CBD5E8' }} />
        </div>
      </div>

      {/* Soft glow orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-3xl opacity-20" style={{ width: 200, height: 200, top: 50, left: '30%', background: '#A8C4FF' }} />
        <div className="absolute rounded-full blur-3xl opacity-15" style={{ width: 150, height: 150, bottom: 30, right: '20%', background: '#C5B4FF' }} />
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section id="hero" className="relative pt-28 pb-16 px-6 overflow-hidden min-h-[calc(100vh-5rem)] flex items-center" style={{ background: '#F7FAFF' }}>
      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(43,127,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43,127,255,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />
      {/* Soft radials */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full blur-3xl opacity-25" style={{ width: 600, height: 600, top: -150, left: -100, background: 'radial-gradient(circle, #A8C4FF, transparent 70%)' }} />
        <div className="absolute rounded-full blur-3xl opacity-15" style={{ width: 400, height: 400, bottom: -100, right: -50, background: 'radial-gradient(circle, #C5B4FF, transparent 70%)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="section-label mb-5 hero-kicker">Soluciones IPTV White-Label</div>
            <h1 className="font-display font-800 leading-tight mb-6 hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#0D1B3E' }}>
              Tu propia aplicación IPTV para{' '}
              <span className="gradient-text">televisores, celulares y computadoras</span>
            </h1>
            <p className="text-lg mb-8 leading-relaxed hero-copy" style={{ color: '#4A5B7A', maxWidth: 520 }}>
              Desarrollamos aplicaciones personalizadas con el nombre, logotipo, colores y funciones de tu empresa. Elige las plataformas que necesitas y construye una solucion adaptada a tu negocio.
            </p>
            <div className="flex flex-wrap gap-4 hero-actions">
              <a href="/plataformas" className="btn-primary px-6 py-3 rounded-xl text-white text-sm">
                <span>Ver plataformas y precios</span>
              </a>
              <a href="/contacto" className="btn-outline px-6 py-3 rounded-xl text-sm">
                Solicitar demostración
              </a>
            </div>
            <div className="flex gap-8 mt-12 pt-8 hero-stats" style={{ borderTop: '1.5px solid #E8EEF8' }}>
              {[['9', 'Plataformas'], ['100%', 'Personalizable'], ['Soporte', 'Especializado'], ['Multi', 'Plataforma']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display font-700 text-2xl gradient-text-blue">{n}</div>
                  <div className="text-sm mt-0.5" style={{ color: '#7A8BAA' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center hero-device">
            <DeviceMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function StrongDeviceMockup() {
  return (
    <div className="hero-visual-shell">
      <div className="hero-visual-panel">
        <div className="hero-visual-glow hero-visual-glow-a" />
        <div className="hero-visual-glow hero-visual-glow-b" />
        <div className="hero-visual-pattern" />

        <div className="hero-floating-card hero-floating-card-a">
          <strong>En vivo</strong>
          <span>Canal 01 · Canal 02</span>
        </div>
        <div className="hero-floating-card hero-floating-card-b">
          <strong>Tu marca</strong>
          <span>Series · Pelicula destacada</span>
        </div>

        <div className="hero-device hero-laptop-frame">
          <div className="hero-screen chrome">
            <div className="hero-screen-top">
              <span />
              <span />
              <span />
            </div>
            <div className="hero-screen-grid">
              <div className="hero-screen-feature">
                <strong>Series</strong>
                <small>Catalogo personalizado</small>
              </div>
              {[1, 2, 3].map(item => <i key={item} />)}
            </div>
          </div>
          <div className="hero-laptop-base" />
        </div>

        <div className="hero-device hero-tv-frame">
          <div className="hero-screen">
            <div className="hero-tv-sidebar">
              {['Inicio', 'En vivo', 'Peliculas', 'Series'].map(item => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="hero-tv-content">
              <div className="hero-tv-banner">
                <strong>Pelicula destacada</strong>
                <small>Tu marca TV</small>
              </div>
              <div className="hero-tv-grid">
                {[1, 2, 3, 4].map(item => <i key={item}>Canal 0{item}</i>)}
              </div>
            </div>
          </div>
          <div className="hero-tv-stand" />
        </div>

        <div className="hero-device hero-phone-frame">
          <div className="hero-phone-notch" />
          <div className="hero-screen compact">
            <div className="hero-phone-brand">Tu marca</div>
            <div className="hero-phone-list">
              {[1, 2, 3].map(item => (
                <i key={item}>
                  <span />
                  <small>Canal 0{item}</small>
                </i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StrongHero() {
  const heroStats = [
    {
      value: '09',
      label: 'Plataformas disponibles',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4">
          <rect x="3" y="4" width="7" height="7" rx="1.5" />
          <rect x="14" y="4" width="7" height="7" rx="1.5" />
          <rect x="3" y="13" width="7" height="7" rx="1.5" />
          <rect x="14" y="13" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      value: '100%',
      label: 'Marca personalizada',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4">
          <path d="M12 3l7 3v5c0 4.2-2.7 8.1-7 10-4.3-1.9-7-5.8-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      value: '24/7',
      label: 'Soporte especializado',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4">
          <path d="M4 13a8 8 0 0116 0" />
          <rect x="3" y="12" width="4" height="7" rx="2" />
          <rect x="17" y="12" width="4" height="7" rx="2" />
          <path d="M12 20h2a2 2 0 002-2" />
        </svg>
      ),
    },
    {
      value: 'Multi',
      label: 'Plataforma',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="w-4 h-4">
          <rect x="2.5" y="5" width="11" height="8" rx="1.8" />
          <rect x="16.5" y="4" width="5" height="10" rx="1.5" />
          <path d="M8 19h8" />
          <path d="M12 13v6" />
        </svg>
      ),
    },
  ]

  return (
    <section id="hero" className="relative pt-28 pb-8 px-6 overflow-hidden min-h-[calc(88vh-5rem)] flex items-center hero-surface">
      <div className="hero-grid-mask" />
      <div className="hero-radial hero-radial-left" />
      <div className="hero-radial hero-radial-right" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[0.44fr_0.56fr] gap-12 xl:gap-16 items-center">
          <div className="hero-copy-column">
            <div className="section-label mb-5 hero-kicker">Soluciones IPTV White-Label</div>
            <h1 className="font-display font-800 leading-[1.04] mb-6 hero-title hero-title-balance" style={{ fontSize: 'clamp(2rem, 4.35vw, 3.55rem)', color: '#09162D' }}>
              Tu propia aplicacion IPTV
              <br />
              para <span className="hero-title-highlight">televisores,</span>
              <br />
              <span className="hero-title-highlight">celulares y computadoras</span>
            </h1>
            <p className="text-[1.05rem] mb-8 leading-relaxed hero-copy hero-copy-width" style={{ color: '#425370' }}>
              Desarrollamos aplicaciones personalizadas con el nombre, logotipo, colores y funciones de tu empresa. Elige las plataformas que necesitas y construye una solucion adaptada a tu negocio.
            </p>
            <div className="flex flex-wrap gap-4 hero-actions">
              <a href="/plataformas" className="btn-primary px-6 py-3.5 rounded-2xl text-white text-sm hero-cta-main">
                <span>Ver plataformas y precios</span>
              </a>
              <a href="/contacto" className="btn-outline px-6 py-3.5 rounded-2xl text-sm hero-cta-secondary">
                Solicitar demostracion
              </a>
            </div>
            <div className="hero-trust-row">
              <span className="hero-trust-dot" />
              <p style={{ color: '#465A78' }}>Cotizacion orientada a operadores, ISPs, cableoperadores y marcas IPTV privadas.</p>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mt-8 hero-stats">
              {heroStats.map(item => (
                <div key={item.label} className="hero-stat-card">
                  <div className="hero-stat-icon">{item.icon}</div>
                  <div className="font-display font-800 text-2xl hero-stat-value">{item.value}</div>
                  <div className="text-sm hero-stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center hero-device-stage">
            <StrongDeviceMockupLinear />
          </div>
        </div>
      </div>
    </section>
  )
}

function StrongDeviceMockupLinear() {
  return (
    <div className="hero-visual-shell">
      <div className="hero-visual-panel hero-visual-panel-linear">
        <div className="hero-visual-glow hero-visual-glow-a" />
        <div className="hero-visual-glow hero-visual-glow-b" />
        <div className="hero-visual-pattern" />

        <div className="hero-device-image-wrap">
          <img
            src="/ChatGPT%20Image%2022%20jul%202026,%2015_39_17.png"
            alt="Vista multiplataforma de VAELO en TV, tablet y movil"
            className="hero-device-image"
          />
        </div>
      </div>
    </div>
  )
}

function HomePlatformsBand({ platforms }: { platforms: typeof PLATFORMS }) {
  return (
    <section className="py-18 px-6 home-platform-band">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
          <div>
            <div className="section-label mb-3" style={{ color: '#8BB8FF' }}>Plataformas disponibles</div>
            <h2 className="font-display font-800" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF' }}>
              Desarrollamos para todos tus dispositivos
            </h2>
            <p className="mt-4 max-w-2xl" style={{ color: '#B7C9E8' }}>
              Construye una experiencia consistente en moviles, televisores, computadoras y navegadores.
            </p>
          </div>
          <a href="/plataformas" className="btn-outline inline-block px-6 py-3 rounded-2xl text-sm" style={{ color: '#DBE8FF', borderColor: 'rgba(140,183,255,0.4)', background: 'rgba(255,255,255,0.04)' }}>
            Ver catalogo completo
          </a>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {platforms.map(platform => (
            <a key={platform.id} href={getPlatformPath(platform.id)} className="home-platform-chip-card">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${platform.color}20`, color: '#FFFFFF', border: `1px solid ${platform.color}40` }}>
                {platform.icon}
              </div>
              <div>
                <h3>{platform.name}</h3>
                <p>{getPlatformCategory(platform.id)}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlatformCard({ p }: { p: typeof PLATFORMS[0] }) {
  const tag = getPlatformCategory(p.id)
  const publishing = getPlatformPublishing(p.id)

  return (
    <div className="platform-card p-6 flex flex-col h-full">
      <div className="platform-card-head">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}15`, color: p.color, border: `1.5px solid ${p.color}25` }}>
          {p.icon}
        </div>
        <span className="platform-tag">{tag}</span>
      </div>

      <div className="platform-visual-stage mb-5" style={{ '--platform-accent': p.color } as React.CSSProperties}>
        <div className="platform-visual-topbar">
          <span className="platform-visual-dot" />
          <span className="platform-visual-dot" />
          <span className="platform-visual-dot" />
          <i>{tag}</i>
        </div>
        <div className="platform-visual-body">
          <div className="platform-visual-hero">
            <strong>{p.name}</strong>
            <small>{p.features[0]}</small>
          </div>
          <div className="platform-visual-stack">
            <span />
            <span />
          </div>
        </div>
        <div className="platform-visual-footer">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="platform-card-copy">
        <h3 className="font-display font-800 text-xl mb-2" style={{ color: '#0D1B3E' }}>{p.name}</h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: '#4A5B7A' }}>{p.description}</p>
      </div>

      <div className="platform-card-section mb-5">
        <span className="platform-section-label">Incluye</span>
        <ul className="space-y-2.5">
          {p.features.slice(0, 3).map(f => (
            <li key={f} className="flex items-start gap-2 text-sm platform-feature-row" style={{ color: '#4A5B7A' }}>
              <span className="platform-feature-bullet">
                <svg className="w-3.5 h-3.5 feature-check" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="platform-card-meta mb-5">
        <div className="platform-price-block">
          <span className="platform-section-label">Desde</span>
          <strong>US${p.price}</strong>
        </div>
        <div className="platform-time-block">
          <span className="platform-section-label">Tiempo estimado</span>
          <strong>{getPlatformTimeline(p.id)}</strong>
        </div>
      </div>

      <div className="platform-card-section mb-5">
        <span className="platform-section-label">Entrega y publicacion</span>
        <div className="flex flex-wrap gap-2.5">
          {publishing.slice(0, 2).map(item => (
            <span key={item} className="platform-delivery-chip">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-3.5 h-3.5">
                <path d="M10 3v14" />
                <path d="M4 10h12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-auto">
        <a href={getPlatformPath(p.id)} className="btn-outline platform-secondary-action block text-center py-2.5 rounded-xl text-sm">
          Ver detalle
        </a>
        <a href="/precios" className="btn-primary platform-primary-action block text-center py-2.5 rounded-xl text-sm text-white">
          <span>Agregar</span>
        </a>
      </div>
    </div>
  )
}

function PlatformSection() {
  const platforms = getManagedPlatforms()
  return (
    <section id="platforms" className="py-24 px-6" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Plataformas disponibles</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Elige las plataformas que necesitas
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 540, margin: '0 auto' }}>
            Cada plataforma se desarrolla de forma independiente con tecnología específica. Cada una tiene su propio precio.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(p => <PlatformCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

function PlatformDetailPage({ platform }: { platform: typeof PLATFORMS[0] }) {
  const compatible = COMPARISON_FEATURES
    .map((feature, index) => ({ feature, value: COMPARISON_DATA[platform.id]?.[index] }))
    .filter(item => item.value)

  return (
    <section className="pt-28 pb-20 px-6" style={{ background: '#fff' }}>
      <div className="max-w-6xl mx-auto">
        <a href="/plataformas" className="nav-link inline-block mb-8">Volver a plataformas</a>
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div>
            <div className="section-label mb-3">Plataforma</div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${platform.color}15`, color: platform.color, border: `1.5px solid ${platform.color}25` }}>
                {platform.icon}
              </div>
              <h1 className="font-display font-800" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#0D1B3E' }}>{platform.name}</h1>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#4A5B7A', maxWidth: 680 }}>{platform.description}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {platform.features.map(feature => (
                <div key={feature} className="rounded-xl p-4" style={{ background: '#F7FAFF', border: '1.5px solid #E8EEF8' }}>
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 mt-0.5 feature-check flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm" style={{ color: '#4A5B7A' }}>{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl p-6 sticky top-24" style={{ background: '#F7FAFF', border: '1.5px solid #E8EEF8' }}>
            <p className="text-xs font-display font-600 uppercase mb-1" style={{ color: '#7A8BAA' }}>Precio base</p>
            <div className="font-display font-800 text-4xl mb-4" style={{ color: '#0D1B3E' }}>US${platform.price}</div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#4A5B7A' }}>
              Incluye desarrollo white-label, identidad visual base, reproductor e integración inicial con tu sistema IPTV.
            </p>
            <a href="/contacto" className="btn-primary block text-center py-3 rounded-xl text-white mb-3">
              <span>Cotizar {platform.name}</span>
            </a>
            <a href="/comparacion" className="btn-outline block text-center py-3 rounded-xl text-sm">
              Comparar plataformas
            </a>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E8EEF8' }}>
              <h3 className="font-display font-700 mb-3" style={{ color: '#0D1B3E' }}>Compatibilidad</h3>
              <div className="flex flex-wrap gap-2">
                {compatible.slice(0, 8).map(item => (
                  <span key={item.feature} className="px-3 py-1.5 rounded-full text-xs" style={{ background: '#fff', color: '#4A5B7A', border: '1px solid #E8EEF8' }}>
                    {item.feature}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const featuredPlatforms = getManagedPlatforms().slice(0, 3)
  const allPlatforms = getManagedPlatforms()
  const quickLinks = [
    { title: 'Plataformas', desc: 'Revisa sistemas disponibles y precios base.', href: '/plataformas' },
    { title: 'Cotizador', desc: 'Calcula un paquete y solicita propuesta.', href: '/precios' },
    { title: 'Servicios', desc: 'Publicacion, hosting, mantenimiento y extras.', href: '/servicios' },
    { title: 'Proceso', desc: 'Conoce como trabajamos de punta a punta.', href: '/proceso' },
  ]

  const benefits = [
    ['Marca propia', 'Nombre, icono, colores, pantallas y experiencia comercial bajo tu identidad.'],
    ['Multiplataforma real', 'Cada sistema se trabaja con criterios de navegacion, tienda y dispositivo.'],
    ['Operacion empresarial', 'Cotizacion, servicios, mantenimiento y soporte pensados para ventas B2B.'],
    ['Escalabilidad', 'Empieza con una plataforma y suma Smart TV, movil, web o escritorio despues.'],
  ]

  const identityChips = [
    {
      label: 'Splash screen',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
          <rect x="3" y="3" width="14" height="14" rx="3" />
          <path d="M7 13l6-6" />
          <path d="M7 7h6v6" />
        </svg>
      ),
    },
    {
      label: 'Logo e icono',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
          <path d="M10 3l5 2.2v3.8c0 3.2-2 6.2-5 7.5-3-1.3-5-4.3-5-7.5V5.2L10 3z" />
        </svg>
      ),
    },
    {
      label: 'Colores corporativos',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
          <path d="M10 3a7 7 0 100 14c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.4-1.3-.3-.5-.4-.8-.4-1.1 0-.8.6-1.4 1.4-1.4h1A3.6 3.6 0 0017 8a5 5 0 00-7-5z" />
          <circle cx="7" cy="8" r="1" fill="currentColor" stroke="none" />
          <circle cx="10" cy="6.5" r="1" fill="currentColor" stroke="none" />
          <circle cx="13" cy="8.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'Soporte y contacto',
      icon: (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
          <path d="M4 10a6 6 0 0112 0" />
          <rect x="3" y="9.5" width="3" height="5" rx="1.5" />
          <rect x="14" y="9.5" width="3" height="5" rx="1.5" />
          <path d="M10 15h1.3a1.7 1.7 0 001.7-1.7" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <StrongHero />
      <HomePlatformsBand platforms={allPlatforms} />
      <section className="py-16 px-6 premium-band">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <div className="section-label mb-3">Accesos rapidos</div>
              <h2 className="font-display font-800" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#0D1B3E' }}>
                Todo el proyecto separado por modulos
              </h2>
            </div>
            <a href="/contacto" className="btn-primary inline-block px-6 py-3 rounded-xl text-sm text-white">
              <span>Solicitar cotizacion</span>
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {quickLinks.map(link => (
              <a key={link.href} href={link.href} className="premium-mini-card rounded-2xl p-5 transition-all">
                <h3 className="font-display font-700 mb-2" style={{ color: '#0D1B3E' }}>{link.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5B7A' }}>{link.desc}</p>
              </a>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {featuredPlatforms.map(platform => <PlatformCard key={platform.id} p={platform} />)}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 dark-section overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.88fr_1.12fr] gap-12 items-center">
          <div>
            <div className="section-label mb-3" style={{ color: '#7DB5FF' }}>Una aplicacion, tu propia marca</div>
            <h2 className="font-display font-800 text-white leading-tight mb-5" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}>
              De reproductor generico a producto digital con identidad comercial.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#B9C8E6' }}>
              VAELO transforma una experiencia IPTV comun en una aplicacion white-label lista para presentarse ante clientes, distribuidores y aliados con una marca consistente.
            </p>
            <div className="brand-chip-grid">
              {identityChips.map(item => (
                <div key={item.label} className="brand-chip-card">
                  <span>{item.icon}</span>
                  <strong>{item.label}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="brand-comparison-premium">
            <div className="brand-scene-card brand-scene-generic">
              <div className="brand-scene-topline">
                <span>GENERICA</span>
                <i>Plantilla comun</i>
              </div>
              <strong>IPTV Player</strong>
              <div className="brand-generic-shell">
                <div className="brand-generic-sidebar">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className="brand-generic-main">
                  <div className="brand-generic-banner" />
                  <div className="brand-generic-row">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="brand-generic-grid">
                    {[1, 2, 3, 4].map(i => <i key={i} />)}
                  </div>
                </div>
              </div>
            </div>

            <div className="brand-scene-card brand-scene-featured">
              <div className="brand-scene-topline">
                <span>WHITE-LABEL</span>
                <i>Marca lista para vender</i>
              </div>
              <strong>VAELO Prime TV</strong>
              <div className="brand-featured-shell">
                <img src="/vaelo-interface-showcase.png" alt="Mockup de interfaz IPTV personalizada de VAELO" className="brand-featured-image" />
                <div className="brand-featured-badge">Branding propio</div>
                <div className="brand-featured-meter">
                  <b />
                  <b />
                  <b />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6" style={{ background: '#F7FAFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-label mb-3">Beneficios comerciales</div>
            <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
              Una plataforma preparada para vender, operar y crecer
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map(([title, desc], index) => (
              <div key={title} className="premium-feature-card">
                <div className="feature-orbit">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="font-display font-800 mb-3" style={{ color: '#0D1B3E' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5B7A' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <section className="py-24 px-6 demo-section">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
          <div>
            <div className="section-label mb-3">Demostracion visual</div>
            <h2 className="font-display font-800 mb-5" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
              Interfaz IPTV pensada para canales, peliculas y series
            </h2>
            <p className="leading-relaxed mb-7" style={{ color: '#4A5B7A' }}>
              La experiencia se organiza en pantallas claras, navegacion simple y modulos reconocibles para usuarios finales, con una presentacion visual mas cercana a un producto comercial listo para marca privada.
            </p>
            <div className="demo-benefit-grid mb-7">
              {['Navegacion clara', 'Diseno adaptable', 'Interfaz personalizada'].map(item => (
                <div key={item} className="demo-benefit-card">
                  <span className="demo-benefit-icon">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-4 h-4">
                      <path d="M4 10l4 4 8-8" />
                    </svg>
                  </span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
            <a href="/contacto" className="btn-outline inline-block px-6 py-3 rounded-xl text-sm demo-secondary-cta">
              Ver demostracion
            </a>
          </div>

          <div className="demo-showcase-card">
            <div className="demo-showcase-glow" />
            <img src="/vaelo-interface-showcase.png" alt="Interfaz IPTV de demostracion para canales, peliculas y series" className="demo-showcase-image" />
          </div>
        </div>
      </section>
      <AdditionalServices />
      <FAQ />
      <section className="px-6 py-20 final-cta">
        <div className="max-w-5xl mx-auto text-center">
          <div className="section-label mb-3" style={{ color: '#7DB5FF' }}>Siguiente paso</div>
          <h2 className="font-display font-800 text-white mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.1rem)' }}>
            Construyamos el paquete IPTV que necesita tu empresa.
          </h2>
          <p className="mb-8" style={{ color: '#C9D7F2' }}>Selecciona plataformas, servicios y recibe una cotizacion con codigo unico.</p>
          <a href="/precios" className="btn-primary inline-block px-7 py-3 rounded-xl text-sm text-white"><span>Crear mi paquete</span></a>
        </div>
      </section>
    </>
  )
}

function PackageBuilder() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const platforms = getManagedPlatforms()

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedPlatforms = platforms.filter(p => selected.has(p.id))
  const subtotal = selectedPlatforms.reduce((s, p) => s + p.price, 0)
  const count = selectedPlatforms.length
  const discountPct = count >= 7 ? 0.20 : count >= 5 ? 0.15 : count >= 3 ? 0.10 : 0
  const discount = Math.round(subtotal * discountPct)
  const total = subtotal - discount

  return (
    <section className="py-24 px-6" style={{ background: '#F7FAFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Constructor de paquete</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Arma tu paquete <span className="gradient-text">multiplataforma</span>
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 520, margin: '0 auto' }}>
            Selecciona las plataformas que necesitas. El precio se actualiza en tiempo real con descuentos automáticos.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-3">
              {platforms.map(p => {
                const on = selected.has(p.id)
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 w-full"
                    style={{
                      background: on ? '#EEF4FF' : '#fff',
                      border: on ? '1.5px solid #2B7FFF' : '1.5px solid #E8EEF8',
                      boxShadow: on ? '0 4px 16px rgba(43,127,255,0.12)' : 'none',
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all"
                      style={{ background: on ? '#2B7FFF' : 'transparent', border: on ? 'none' : '2px solid #C5D5F5' }}
                    >
                      {on && (
                        <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-600 text-sm" style={{ color: '#0D1B3E' }}>{p.name}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#7A8BAA' }}>Desde US${p.price}</div>
                    </div>
                    <div className="flex-shrink-0" style={{ color: p.color, opacity: 0.7 }}>{p.icon}</div>
                  </button>
                )
              })}
            </div>
            {count >= 3 && (
              <div className="mt-4 px-4 py-3 rounded-xl text-sm flex items-center gap-2" style={{ background: '#EEF4FF', border: '1.5px solid #C5D5F5', color: '#2B7FFF' }}>
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
                </svg>
                ¡Descuento multiplataforma aplicado! {(discountPct * 100).toFixed(0)}% off por {count} plataformas
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl p-6" style={{ background: '#fff', border: '1.5px solid #E8EEF8', boxShadow: '0 8px 32px rgba(43,127,255,0.08)' }}>
              <h3 className="font-display font-700 text-lg mb-5" style={{ color: '#0D1B3E' }}>Resumen de cotización</h3>

              {count === 0 ? (
                <p className="text-sm text-center py-8" style={{ color: '#7A8BAA' }}>
                  Selecciona una o más plataformas para ver el estimado
                </p>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    {selectedPlatforms.map(p => (
                      <div key={p.id} className="flex justify-between text-sm">
                        <span style={{ color: '#4A5B7A' }}>{p.name}</span>
                        <span className="font-display font-600" style={{ color: '#0D1B3E' }}>US${p.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 space-y-2" style={{ borderTop: '1.5px solid #E8EEF8' }}>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#4A5B7A' }}>Subtotal</span>
                      <span style={{ color: '#0D1B3E' }}>US${subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span style={{ color: '#2B7FFF' }}>Descuento ({(discountPct*100).toFixed(0)}%)</span>
                        <span style={{ color: '#2B7FFF' }}>-US${discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2" style={{ borderTop: '1.5px solid #E8EEF8' }}>
                      <span className="font-display font-700" style={{ color: '#0D1B3E' }}>Total estimado</span>
                      <span className="font-display font-700 text-2xl gradient-text-blue">US${total}</span>
                    </div>
                  </div>
                </>
              )}

              <a href="/contacto" className="btn-primary w-full block text-center py-3 rounded-xl text-sm text-white mt-6">
                <span>{count === 0 ? 'Solicitar cotización' : 'Solicitar este paquete'}</span>
              </a>
              <p className="text-xs mt-3 text-center leading-relaxed" style={{ color: '#9AAABB' }}>
                El precio final puede variar según las funciones, diseño, servidor IPTV y requisitos de publicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ComparisonTable() {
  const platforms = getManagedPlatforms()
  const CheckIcon = () => (
    <svg className="w-4 h-4 feature-check mx-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  )
  const PartialIcon = () => (
    <svg className="w-4 h-4 feature-partial mx-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
    </svg>
  )
  const NoIcon = () => (
    <svg className="w-4 h-4 feature-no mx-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
    </svg>
  )

  return (
    <section id="comparison" className="py-24 px-6" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Comparativa</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Comparación de plataformas
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 500, margin: '0 auto' }}>
            Identifica qué funciones están disponibles en cada sistema operativo.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl" style={{ border: '1.5px solid #E8EEF8', boxShadow: '0 4px 24px rgba(43,127,255,0.06)' }}>
          <table className="w-full" style={{ minWidth: 900 }}>
            <thead>
              <tr style={{ background: '#F4F7FF', borderBottom: '1.5px solid #E8EEF8' }}>
                <th className="text-left px-5 py-4 font-display font-600 text-sm w-48" style={{ color: '#4A5B7A' }}>Función</th>
                {platforms.map(p => (
                  <th key={p.id} className="px-3 py-4 text-center" style={{ minWidth: 90 }}>
                    <div className="font-display font-600" style={{ fontSize: 11, lineHeight: 1.3, color: '#0D1B3E' }}>{p.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((feat, fi) => (
                <tr key={feat} style={{ background: fi % 2 === 0 ? '#fff' : '#F7FAFF', borderBottom: '1px solid #F0F4FF' }}>
                  <td className="px-5 py-3.5 text-sm font-500" style={{ color: '#4A5B7A' }}>{feat}</td>
                  {platforms.map(p => {
                    const val = COMPARISON_DATA[p.id]?.[fi]
                    return (
                      <td key={p.id} className="px-3 py-3.5 text-center">
                        {val === true ? <CheckIcon /> : val === 'partial' ? <PartialIcon /> : <NoIcon />}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-6 justify-center mt-5 text-xs" style={{ color: '#7A8BAA' }}>
          <span className="flex items-center gap-1.5"><span className="feature-check text-base">✓</span> Incluido</span>
          <span className="flex items-center gap-1.5"><span className="feature-partial text-base">ⓘ</span> Opcional</span>
          <span className="flex items-center gap-1.5"><span className="feature-no text-base">✗</span> No disponible</span>
        </div>
      </div>
    </section>
  )
}

function Customization() {
  const items = [
    'Nombre de la aplicación', 'Logotipo', 'Ícono personalizado', 'Colores corporativos',
    'Pantalla de carga', 'Fondos y banners', 'Menú principal', 'Banners promocionales',
    'Diseño de canales', 'Diseño de películas', 'WhatsApp de soporte', 'Dominio personalizado',
  ]

  return (
    <section id="customization" className="py-24 px-6" style={{ background: '#F7FAFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Personalización total</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Una aplicación <span className="gradient-text">completamente adaptada</span> a tu marca
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="grid grid-cols-2 gap-3">
              {items.map(item => (
                <div key={item} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: '#fff', border: '1.5px solid #E8EEF8' }}>
                  <div className="w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: '#EEF4FF' }}>
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="#2B7FFF">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <span className="text-sm" style={{ color: '#4A5B7A' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Generic */}
            <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #E8EEF8', boxShadow: '0 4px 16px rgba(13,27,62,0.06)' }}>
              <div className="px-3 py-2 flex items-center gap-1.5" style={{ background: '#F0F4FF' }}>
                <div className="w-2 h-2 rounded-full bg-red-400/70" />
                <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <div className="w-2 h-2 rounded-full bg-green-400/70" />
                <span className="text-xs ml-2 font-display font-500" style={{ color: '#7A8BAA' }}>App Genérica</span>
              </div>
              <div className="p-4 bg-white">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-1" style={{ background: '#F0F4FF' }}>
                    <span className="text-lg">▶</span>
                  </div>
                  <div className="text-sm" style={{ color: '#9AAABB' }}>IPTV Player</div>
                </div>
                <div className="space-y-2">
                  {['Canal 1','Canal 2','Canal 3'].map(c => (
                    <div key={c} className="flex items-center gap-2 p-2 rounded" style={{ background: '#F7FAFF' }}>
                      <div className="w-8 h-5 rounded flex-shrink-0" style={{ background: '#E2E8F8' }} />
                      <div className="text-xs" style={{ color: '#9AAABB' }}>{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom */}
            <div className="rounded-2xl overflow-hidden animate-pulse-glow" style={{ border: '2px solid #2B7FFF', boxShadow: '0 4px 24px rgba(43,127,255,0.18)' }}>
              <div className="px-3 py-2 flex items-center gap-1.5" style={{ background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' }}>
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/40" />
                <span className="text-xs ml-2 text-white font-display font-600">Tu Marca</span>
              </div>
              <div className="p-4 bg-white">
                <div className="text-center mb-3">
                  <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-1" style={{ background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' }}>
                    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div className="text-sm font-display font-600 gradient-text-blue">MiTV Pro</div>
                </div>
                <div className="space-y-2">
                  {[['Canal ESPN', '#2B7FFF'], ['Canal Fox', '#7B4EFF'], ['Canal CNN', '#1A9FCC']].map(([c, col]) => (
                    <div key={c} className="flex items-center gap-2 p-2 rounded" style={{ background: '#EEF4FF', border: `1px solid ${col}25` }}>
                      <div className="w-8 h-5 rounded flex-shrink-0" style={{ background: col + '30' }} />
                      <div className="text-xs font-500" style={{ color: '#0D1B3E' }}>{c}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AdditionalServices() {
  const services = getManagedServices()
  return (
    <section className="py-24 px-6" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Servicios adicionales</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Complementa tu proyecto
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 480, margin: '0 auto' }}>
            Servicios opcionales para publicación, administración y mantenimiento de tu aplicación.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map(s => (
            <div key={s.name} className="platform-card p-5">
              <div className="font-display font-600 text-sm mb-2" style={{ color: '#0D1B3E' }}>{s.name}</div>
              <div className="font-display font-700 gradient-text-blue">{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EnhancedPlatformSection() {
  const platforms = getManagedPlatforms()
  const smartTvCount = platforms.filter(platform => getPlatformCategory(platform.id) === 'Smart TV').length

  return (
    <section id="platforms" className="py-24 px-6 platform-catalog-shell">
      <div className="max-w-7xl mx-auto">
        <div className="grid xl:grid-cols-[0.95fr_1.05fr] gap-10 items-end mb-14">
          <div>
            <div className="section-label mb-3">Plataformas disponibles</div>
            <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
              Catalogo multiplataforma para mover tu marca entre TV, movil, web y escritorio
            </h2>
            <p style={{ color: '#4A5B7A', maxWidth: 620 }}>
              Cada plataforma se desarrolla de forma independiente con criterios tecnicos, publicacion y navegacion propios. Puedes empezar con una sola y escalar despues sin rehacer la propuesta comercial.
            </p>
          </div>
          <div className="catalog-summary-panel">
            <div>
              <span>Total disponibles</span>
              <strong>{platforms.length} plataformas</strong>
            </div>
            <div>
              <span>Foco Smart TV</span>
              <strong>{smartTvCount} opciones</strong>
            </div>
            <div>
              <span>Tiempo de arranque</span>
              <strong>Desde 3 semanas</strong>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map(p => <PlatformCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

function EnhancedPlatformDetailPage({ platform }: { platform: typeof PLATFORMS[0] }) {
  const compatible = COMPARISON_FEATURES
    .map((feature, index) => ({ feature, value: COMPARISON_DATA[platform.id]?.[index] }))
    .filter(item => item.value)
  const publishing = getPlatformPublishing(platform.id)
  const requirements = getPlatformRequirements(platform)
  const recommendedServices = getRecommendedServicesForPlatform(platform)
  const platformFaq = getPlatformFaq(platform)
  const process = [
    'Brief comercial y definicion de marca',
    'Adaptacion visual y estructura funcional',
    'Integracion con servidor o API',
    'Pruebas internas por dispositivo',
    'Entrega o preparacion de publicacion',
  ]

  return (
    <section className="pt-28 pb-20 px-6 platform-detail-shell">
      <div className="max-w-7xl mx-auto">
        <a href="/plataformas" className="nav-link inline-block mb-8">Volver a plataformas</a>

        <div className="grid lg:grid-cols-[1.06fr_0.94fr] gap-10 items-start mb-12">
          <div>
            <div className="section-label mb-3">Detalle de plataforma</div>
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: `${platform.color}15`, color: platform.color, border: `1.5px solid ${platform.color}25` }}>
                {platform.icon}
              </div>
              <div>
                <h1 className="font-display font-800" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', color: '#0D1B3E' }}>{platform.name}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="platform-tag">{getPlatformCategory(platform.id)}</span>
                  <span className="platform-chip">Tiempo {getPlatformTimeline(platform.id)}</span>
                </div>
              </div>
            </div>
            <p className="text-lg leading-relaxed mb-8" style={{ color: '#4A5B7A', maxWidth: 720 }}>{platform.description}</p>

            <div className="platform-detail-hero-card">
              <div className="platform-preview-grid">
                <div className="platform-preview-main" style={{ borderColor: `${platform.color}45` }}>
                  <div className="platform-preview-ribbon" style={{ background: platform.color }} />
                  <div className="platform-preview-row">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="platform-preview-content">
                    {[1, 2, 3, 4].map(item => <i key={item} />)}
                  </div>
                </div>
                <div className="platform-preview-side">
                  <div />
                  <div />
                </div>
              </div>
            </div>
          </div>

          <aside className="platform-sticky-summary">
            <p className="text-xs font-display font-700 uppercase mb-1" style={{ color: '#7A8BAA' }}>Precio base</p>
            <div className="font-display font-800 text-4xl mb-4" style={{ color: '#0D1B3E' }}>US${platform.price}</div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#4A5B7A' }}>
              Incluye desarrollo white-label, identidad visual base, reproductor e integracion inicial con tu entorno IPTV.
            </p>
            <div className="summary-stat-grid">
              <div>
                <span>Entrega estimada</span>
                <strong>{getPlatformTimeline(platform.id)}</strong>
              </div>
              <div>
                <span>Publicacion</span>
                <strong>{publishing[0]}</strong>
              </div>
            </div>
            <a href="/precios" className="btn-primary block text-center py-3 rounded-xl text-white mb-3">
              <span>Anadir al paquete</span>
            </a>
            <a href="/contacto" className="btn-outline block text-center py-3 rounded-xl text-sm mb-3">
              Solicitar cotizacion
            </a>
            <a href="/comparacion" className="platform-link-row">Comparar plataformas</a>

            <div className="mt-8 pt-6" style={{ borderTop: '1px solid #E8EEF8' }}>
              <h3 className="font-display font-700 mb-3" style={{ color: '#0D1B3E' }}>Compatibilidad</h3>
              <div className="flex flex-wrap gap-2">
                {compatible.slice(0, 8).map(item => (
                  <span key={item.feature} className="platform-chip">{item.feature}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="grid lg:grid-cols-[1fr_0.92fr] gap-8 mb-8">
          <section className="detail-panel">
            <div className="section-label mb-3">Incluye</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Caracteristicas base del entregable</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {platform.features.map(feature => (
                <div key={feature} className="detail-list-card">
                  <svg className="w-5 h-5 mt-0.5 feature-check flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <div className="section-label mb-3">Publicacion</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Opciones de entrega y salida</h2>
            <div className="space-y-3">
              {publishing.map(item => (
                <div key={item} className="detail-list-card">
                  <svg className="w-5 h-5 mt-0.5 feature-check flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <section className="detail-panel lg:col-span-2">
            <div className="section-label mb-3">Proceso de desarrollo</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Como trabajamos esta plataforma</h2>
            <div className="detail-timeline">
              {process.map((step, index) => (
                <div key={step} className="timeline-row">
                  <div className="timeline-index">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <strong>{step}</strong>
                    <p>Seguimiento tecnico, validacion funcional y control de calidad orientado al tipo de dispositivo.</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <div className="section-label mb-3">Requisitos</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Lo que necesitaremos de tu lado</h2>
            <div className="space-y-3">
              {requirements.map(item => (
                <div key={item} className="detail-list-card">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="detail-panel mb-8 notice-panel">
          <div className="section-label mb-3">Avisos importantes</div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'La publicacion esta sujeta a la revision y aprobacion de cada tienda.',
              'Las cuentas de desarrollador, licencias, certificados y pagos requeridos por terceros pueden cobrarse por separado.',
              'La compatibilidad puede variar segun el modelo, version del sistema y capacidad del dispositivo.',
            ].map(item => (
              <div key={item} className="notice-card">{item}</div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8">
          <section className="detail-panel">
            <div className="section-label mb-3">Servicios recomendados</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Complementos que suelen acompanar esta entrega</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {recommendedServices.map(service => (
                <div key={service.name} className="service-inline-card">
                  <strong>{service.name}</strong>
                  <span>{service.price}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="detail-panel">
            <div className="section-label mb-3">FAQ especifico</div>
            <h2 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Preguntas habituales sobre {platform.name}</h2>
            <div className="space-y-3">
              {platformFaq.map(item => (
                <div key={item.q} className="faq-compact-card">
                  <strong>{item.q}</strong>
                  <p>{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

function EnhancedAdditionalServices() {
  const services = getManagedServices()
  const featured = services.slice(0, 4)
  const support = services.slice(4)

  return (
    <section className="py-24 px-6 services-shell">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-end mb-14">
          <div>
            <div className="section-label mb-3">Servicios adicionales</div>
            <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
              Complementos tecnicos y comerciales para cerrar una propuesta mas completa
            </h2>
            <p style={{ color: '#4A5B7A', maxWidth: 620 }}>
              Publicacion, hosting, panel, mantenimiento, notificaciones y capas extra de operacion para convertir una app en una solucion lista para vender.
            </p>
          </div>
          <div className="services-featured-grid">
            {featured.map(service => (
              <div key={service.name} className="service-highlight-card">
                <strong>{service.name}</strong>
                <span>{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {support.map(s => (
            <div key={s.name} className="platform-card p-5">
              <div className="font-display font-700 text-sm mb-2" style={{ color: '#0D1B3E' }}>{s.name}</div>
              <div className="font-display font-700 gradient-text-blue mb-2">{s.price}</div>
              <p className="text-sm" style={{ color: '#60708A' }}>Servicio complementario configurable segun plataforma y alcance comercial.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EnhancedCustomization() {
  const [brandName, setBrandName] = useState('VAELO Prime')
  const [selectedColor, setSelectedColor] = useState('#2B7FFF')
  const colors = ['#2B7FFF', '#0EA5A4', '#2563EB', '#0F766E', '#1D4ED8', '#F97316']
  const items = [
    'Nombre de la aplicacion',
    'Logotipo e icono',
    'Colores corporativos',
    'Splash y pantalla de carga',
    'Banners promocionales',
    'Menu principal',
    'Diseño de canales, peliculas y series',
    'Dominio y soporte de contacto',
  ]

  return (
    <section id="customization" className="py-24 px-6 services-shell">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div>
            <div className="section-label mb-3">Personalizacion total</div>
            <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
              De una app generica a una experiencia que se reconoce como tuya
            </h2>
            <p className="leading-relaxed mb-8" style={{ color: '#4A5B7A' }}>
              Esta demo no es un editor final, pero si muestra de forma clara el nivel de personalizacion que podemos aplicar sobre TV, movil y pantallas comerciales.
            </p>

            <div className="detail-panel">
              <div className="space-y-3 mb-6">
                <label className="admin-field">
                  <span>Nombre de demostracion</span>
                  <input value={brandName} onChange={e => setBrandName(e.target.value)} />
                </label>
              </div>
              <div className="mb-5">
                <span className="block text-sm font-display font-700 mb-3" style={{ color: '#60708A' }}>Color principal</span>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <button
                      key={color}
                      type="button"
                      aria-label={color}
                      className="color-dot"
                      style={{ background: color, outline: selectedColor === color ? '3px solid rgba(13,27,62,0.18)' : 'none' }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {items.map(item => (
                  <div key={item} className="detail-list-card">
                    <svg className="w-5 h-5 mt-0.5 feature-check flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="brand-panel muted" style={{ transform: 'none' }}>
              <span>GENERICA</span>
              <strong>IPTV Player</strong>
              <div className="brand-screen">
                {[1, 2, 3, 4].map(i => <i key={i} />)}
              </div>
            </div>

            <div className="custom-brand-stage">
              <div className="custom-brand-tv">
                <div className="custom-brand-top" style={{ background: `linear-gradient(135deg, ${selectedColor}, #0D1B3E)` }}>
                  <strong>{brandName}</strong>
                  <span>Canales · Peliculas · Series</span>
                </div>
                <div className="custom-brand-grid">
                  {[1, 2, 3, 4].map(i => <i key={i} style={{ background: `${selectedColor}22`, borderColor: `${selectedColor}35` }} />)}
                </div>
              </div>
              <div className="custom-brand-phone">
                <div className="custom-brand-notch" />
                <div className="custom-brand-top mini" style={{ background: `linear-gradient(135deg, ${selectedColor}, #0D1B3E)` }}>
                  <strong>{brandName}</strong>
                </div>
                <div className="custom-brand-list">
                  {[1, 2, 3].map(i => <i key={i} style={{ background: `${selectedColor}18` }} />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EnhancedPackageBuilder() {
  const platforms = getManagedPlatforms()
  const services = getManagedServices()
  const db = getLocalDb()
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(getQuoteDraft()?.platforms ?? [])
  const [selectedServices, setSelectedServices] = useState<string[]>(getQuoteDraft()?.services ?? [])
  const estimate = buildQuoteEstimate(selectedPlatforms, selectedServices)

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id])
  }

  const toggleService = (name: string) => {
    setSelectedServices(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name])
  }

  useEffect(() => {
    saveQuoteDraft(selectedPlatforms, selectedServices)
  }, [selectedPlatforms, selectedServices])

  return (
    <section className="py-24 px-6 platform-catalog-shell">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Constructor de paquetes</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
            Configura una propuesta con plataformas, extras y descuento automatico
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 700, margin: '0 auto' }}>
            El resumen se actualiza en tiempo real y queda listo para pasar a cotizacion con selecciones, descuento y estructura de pago sugerida.
          </p>
        </div>

        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8">
          <div className="space-y-8">
            <section className="detail-panel">
              <div className="admin-panel-header">
                <div>
                  <h3 className="font-display font-800 text-2xl" style={{ color: '#0D1B3E' }}>Plataformas</h3>
                  <p className="text-sm" style={{ color: '#60708A' }}>Selecciona una o varias segun el alcance comercial.</p>
                </div>
                <span className="admin-badge">{selectedPlatforms.length} seleccionadas</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {platforms.map(platform => {
                  const active = selectedPlatforms.includes(platform.id)
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform.id)}
                      className="platform-choice-card"
                      style={{
                        borderColor: active ? '#2B7FFF' : '#DDE7F5',
                        boxShadow: active ? '0 18px 38px rgba(43,127,255,0.14)' : undefined,
                        background: active ? 'linear-gradient(180deg, rgba(238,244,255,0.95), rgba(255,255,255,0.98))' : undefined,
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${platform.color}15`, color: platform.color }}>
                          {platform.icon}
                        </div>
                        <span className="platform-tag">{getPlatformCategory(platform.id)}</span>
                      </div>
                      <strong>{platform.name}</strong>
                      <p>{platform.description}</p>
                      <div className="platform-choice-meta">
                        <span>Desde US${platform.price}</span>
                        <span>{getPlatformTimeline(platform.id)}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>

            <section className="detail-panel">
              <div className="admin-panel-header">
                <div>
                  <h3 className="font-display font-800 text-2xl" style={{ color: '#0D1B3E' }}>Servicios adicionales</h3>
                  <p className="text-sm" style={{ color: '#60708A' }}>Publicacion, operacion, soporte y crecimiento.</p>
                </div>
                <span className="admin-badge">{selectedServices.length} extras</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {services.map(service => {
                  const active = selectedServices.includes(service.name)
                  return (
                    <button
                      key={service.name}
                      type="button"
                      onClick={() => toggleService(service.name)}
                      className="service-select-card"
                      style={{ borderColor: active ? '#2B7FFF' : '#DDE7F5', background: active ? '#EEF4FF' : '#fff' }}
                    >
                      <strong>{service.name}</strong>
                      <span>{service.price}</span>
                      <small>{isRecurringService(service.name, service.price) ? 'Cargo recurrente' : 'Cargo unico'}</small>
                    </button>
                  )
                })}
              </div>
            </section>
          </div>

          <aside className="platform-sticky-summary">
            <h3 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Resumen</h3>
            <div className="space-y-4">
              <div className="summary-line"><span>Plataformas</span><strong>{selectedPlatforms.length}</strong></div>
              <div className="summary-line"><span>Servicios</span><strong>{selectedServices.length}</strong></div>
              <div className="summary-line"><span>Subtotal plataformas</span><strong>US${estimate.platformSubtotal}</strong></div>
              <div className="summary-line"><span>Descuento</span><strong>{estimate.discountPct}%</strong></div>
              <div className="summary-line"><span>Monto descontado</span><strong>-US${estimate.discountAmount}</strong></div>
              <div className="summary-line"><span>Pago unico</span><strong>US${estimate.oneTimeTotal}</strong></div>
              <div className="summary-line"><span>Servicios mensuales</span><strong>US${estimate.monthlyTotal}</strong></div>
            </div>

            <div className="quote-total-panel mt-6">
              <span>Total estimado</span>
              <strong>US${estimate.estimatedTotal}</strong>
              <p>Pago inicial sugerido: US${estimate.suggestedDeposit} · saldo: US${estimate.remainingBalance}</p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="text-sm" style={{ color: '#60708A' }}>
                Reglas de descuento activas: {db.discountRules.map(rule => `${rule.minPlatforms}+ (${rule.discountPct}%)`).join(' · ')}
              </div>
              <a href="/contacto" className="btn-primary block text-center py-3 rounded-xl text-white">
                <span>Continuar a cotizacion</span>
              </a>
            </div>

            <p className="text-xs mt-4 leading-relaxed" style={{ color: '#7A8BAA' }}>
              Precio estimado. El valor final puede variar segun funciones, diseño, servidor IPTV, publicacion y requisitos tecnicos.
            </p>
          </aside>
        </div>
      </div>
    </section>
  )
}

function EnhancedQuoteForm() {
  const draft = getQuoteDraft()
  const initialPlatforms = draft?.platforms ?? []
  const initialServices = draft?.services ?? []
  const [form, setForm] = useState<QuoteFormState>({
    name: '',
    company: '',
    country: '',
    email: '',
    whatsapp: '',
    appName: '',
    website: '',
    clients: '',
    platforms: initialPlatforms,
    services: initialServices,
    iptv_panel: '',
    store_publish: '',
    admin_panel: '',
    budget: '',
    desiredDelivery: '',
    description: '',
    privacyAccepted: false,
    logoName: '',
  })
  const [sentQuote, setSentQuote] = useState<LocalQuote | null>(null)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const platforms = getManagedPlatforms()
  const services = getManagedServices()
  const estimate = buildQuoteEstimate(form.platforms, form.services)

  const setField = <K extends keyof QuoteFormState>(key: K, value: QuoteFormState[K]) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const togglePlatform = (id: string) => {
    setForm(prev => ({ ...prev, platforms: prev.platforms.includes(id) ? prev.platforms.filter(item => item !== id) : [...prev.platforms, id] }))
  }

  const toggleService = (name: string) => {
    setForm(prev => ({ ...prev, services: prev.services.includes(name) ? prev.services.filter(item => item !== name) : [...prev.services, name] }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.privacyAccepted) return

    const quote = saveLocalQuote({
      name: form.name || 'Sin nombre',
      company: form.company || 'Sin empresa',
      country: form.country,
      email: form.email,
      whatsapp: form.whatsapp,
      clients: form.clients,
      platforms: form.platforms,
      services: form.services,
      iptv_panel: form.iptv_panel,
      store_publish: form.store_publish,
      admin_panel: form.admin_panel,
      budget: form.budget,
      description: form.description,
      appName: form.appName,
      website: form.website,
      desiredDelivery: form.desiredDelivery,
      logoName: form.logoName,
      subtotal: estimate.platformSubtotal,
      discountAmount: estimate.discountAmount,
      monthlyTotal: estimate.monthlyTotal,
      oneTimeTotal: estimate.oneTimeTotal,
      suggestedDeposit: estimate.suggestedDeposit,
      remainingBalance: estimate.remainingBalance,
      estimatedTotal: estimate.estimatedTotal,
    })

    const message = [
      `Hola, quiero dar seguimiento a la cotizacion ${quote.id}.`,
      `Empresa: ${quote.company}`,
      `Aplicacion: ${quote.appName || 'Por definir'}`,
      `Plataformas: ${estimate.platforms.map(platform => platform.name).join(', ')}`,
      `Servicios: ${estimate.services.map(service => service.name).join(', ') || 'Ninguno'}`,
      `Pago unico: US$${estimate.oneTimeTotal}`,
      `Servicios mensuales: US$${estimate.monthlyTotal}`,
    ].join('\n')

    setWhatsappUrl(`https://wa.me/?text=${encodeURIComponent(message)}`)
    setSentQuote(quote)
    clearQuoteDraft()
  }

  if (sentQuote) {
    return (
      <section id="contact" className="py-24 px-6 platform-detail-shell">
        <div className="max-w-4xl mx-auto">
          <div className="detail-panel text-center">
            <div className="w-18 h-18 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #2B7FFF, #0D1B3E)' }}>
              <svg className="w-8 h-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="section-label mb-3">Solicitud registrada</div>
            <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
              Cotizacion creada con el codigo {sentQuote.id}
            </h2>
            <p style={{ color: '#4A5B7A', maxWidth: 700, margin: '0 auto 28px' }}>
              Guardamos un snapshot local de plataformas, servicios, montos y datos de contacto para que futuros cambios de precio no alteren esta solicitud.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-left mb-8">
              <div className="detail-list-card"><span>Pago unico estimado: US${sentQuote.oneTimeTotal ?? sentQuote.estimatedTotal}</span></div>
              <div className="detail-list-card"><span>Mensual estimado: US${sentQuote.monthlyTotal ?? 0}</span></div>
              <div className="detail-list-card"><span>Pago inicial sugerido: US${sentQuote.suggestedDeposit ?? 0}</span></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary px-6 py-3 rounded-xl text-white"><span>Contactar por WhatsApp</span></a>
              <button type="button" className="btn-outline px-6 py-3 rounded-xl" onClick={() => window.print()}>Imprimir resumen</button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-6 platform-detail-shell">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Cotizacion profesional</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D1B3E' }}>
            Envia tu solicitud con plataformas, servicios y datos del proyecto
          </h2>
        </div>

        <div className="grid xl:grid-cols-[1.08fr_0.92fr] gap-8">
          <form onSubmit={handleSubmit} className="detail-panel space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              {([
                { label: 'Nombre completo', key: 'name', placeholder: 'Ej. Carlos Rodriguez' },
                { label: 'Empresa o marca', key: 'company', placeholder: 'Ej. MiTV Solutions' },
                { label: 'Pais', key: 'country', placeholder: 'Ej. Mexico' },
                { label: 'WhatsApp', key: 'whatsapp', placeholder: '+52 55 1234 5678' },
                { label: 'Correo electronico', key: 'email', placeholder: 'correo@empresa.com' },
                { label: 'Nombre deseado para la app', key: 'appName', placeholder: 'Ej. MiTV GO' },
                { label: 'Sitio web', key: 'website', placeholder: 'https://empresa.com' },
                { label: 'Presupuesto aproximado', key: 'budget', placeholder: 'Ej. US$2,000' },
              ] satisfies { label: string; key: QuoteTextFieldKey; placeholder: string }[]).map(item => (
                <label key={item.key} className="admin-field">
                  <span>{item.label}</span>
                  <input value={String(form[item.key] ?? '')} placeholder={item.placeholder} onChange={e => setField(item.key, e.target.value)} />
                </label>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="admin-field">
                <span>Servidor IPTV o tipo de fuente</span>
                <input value={form.iptv_panel} placeholder="Xtream Codes, API, lista privada..." onChange={e => setField('iptv_panel', e.target.value)} />
              </label>
              <label className="admin-field">
                <span>Fecha deseada de entrega</span>
                <input type="date" value={form.desiredDelivery} onChange={e => setField('desiredDelivery', e.target.value)} />
              </label>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="admin-field">
                <span>Publicacion en tiendas</span>
                <select value={form.store_publish} onChange={e => setField('store_publish', e.target.value)} className="admin-select">
                  <option value="">Seleccionar...</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="consultar">Consultar</option>
                </select>
              </label>
              <label className="admin-field">
                <span>Panel administrativo</span>
                <select value={form.admin_panel} onChange={e => setField('admin_panel', e.target.value)} className="admin-select">
                  <option value="">Seleccionar...</option>
                  <option value="si">Si</option>
                  <option value="no">No</option>
                  <option value="consultar">Consultar</option>
                </select>
              </label>
            </div>

            <div>
              <span className="block text-sm font-display font-700 mb-3" style={{ color: '#60708A' }}>Plataformas</span>
              <div className="grid sm:grid-cols-2 gap-3">
                {platforms.map(platform => (
                  <button key={platform.id} type="button" onClick={() => togglePlatform(platform.id)} className="service-select-card" style={{ borderColor: form.platforms.includes(platform.id) ? '#2B7FFF' : '#DDE7F5', background: form.platforms.includes(platform.id) ? '#EEF4FF' : '#fff' }}>
                    <strong>{platform.name}</strong>
                    <span>US${platform.price}</span>
                    <small>{getPlatformCategory(platform.id)}</small>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-sm font-display font-700 mb-3" style={{ color: '#60708A' }}>Servicios adicionales</span>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map(service => (
                  <button key={service.name} type="button" onClick={() => toggleService(service.name)} className="service-select-card" style={{ borderColor: form.services.includes(service.name) ? '#2B7FFF' : '#DDE7F5', background: form.services.includes(service.name) ? '#EEF4FF' : '#fff' }}>
                    <strong>{service.name}</strong>
                    <span>{service.price}</span>
                    <small>{isRecurringService(service.name, service.price) ? 'Recurrente' : 'Unico'}</small>
                  </button>
                ))}
              </div>
            </div>

            <label className="admin-field">
              <span>Descripcion del proyecto</span>
              <textarea value={form.description} rows={5} placeholder="Cuéntanos objetivos, alcance, servidores, branding, idiomas o cualquier restriccion importante." onChange={e => setField('description', e.target.value)} className="admin-select" />
            </label>

            <div className="grid sm:grid-cols-2 gap-5">
              <label className="admin-field">
                <span>Archivo de logotipo</span>
                <input type="file" onChange={e => setField('logoName', e.target.files?.[0]?.name ?? '')} />
              </label>
              <label className="admin-field">
                <span>Clientes aproximados</span>
                <input value={form.clients} placeholder="Ej. 500" onChange={e => setField('clients', e.target.value)} />
              </label>
            </div>

            <label className="admin-toggle-row">
              <input type="checkbox" checked={form.privacyAccepted} onChange={e => setField('privacyAccepted', e.target.checked)} />
              <span>Acepto el tratamiento de datos y la politica de privacidad para recibir la cotizacion.</span>
            </label>

            <button type="submit" className="btn-primary w-full py-3.5 rounded-xl text-white text-base" disabled={!form.privacyAccepted}>
              <span>Registrar cotizacion</span>
            </button>
          </form>

          <aside className="platform-sticky-summary">
            <h3 className="font-display font-800 text-2xl mb-5" style={{ color: '#0D1B3E' }}>Resumen de solicitud</h3>
            <div className="space-y-4">
              <div className="summary-line"><span>Plataformas</span><strong>{estimate.platforms.length}</strong></div>
              <div className="summary-line"><span>Servicios</span><strong>{estimate.services.length}</strong></div>
              <div className="summary-line"><span>Subtotal</span><strong>US${estimate.platformSubtotal}</strong></div>
              <div className="summary-line"><span>Descuento</span><strong>-US${estimate.discountAmount}</strong></div>
              <div className="summary-line"><span>Pago unico</span><strong>US${estimate.oneTimeTotal}</strong></div>
              <div className="summary-line"><span>Mensual</span><strong>US${estimate.monthlyTotal}</strong></div>
            </div>
            <div className="quote-total-panel mt-6">
              <span>Total estimado</span>
              <strong>US${estimate.estimatedTotal}</strong>
              <p>Codigo generado al confirmar: secuencia local tipo `VAELO-Q-1001`.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function RecommendedPackages() {
  const pkgs = [
    {
      name: 'Paquete Móvil',
      desc: 'Ideal para distribuidores enfocados en dispositivos móviles',
      includes: ['Android Móvil', 'iPhone y iPad', 'Diseño personalizado', 'Soporte inicial'],
      price: 'Desde US$798',
      cta: 'Solicitar paquete móvil',
      featured: false,
      accent: '#2B7FFF',
    },
    {
      name: 'Paquete Completo',
      desc: 'La solución más completa con presencia en todas las plataformas',
      includes: ['Android', 'Android TV', 'iOS', 'Samsung TV', 'LG TV', 'VIDAA', 'Titan OS', 'Windows', 'Web', 'Panel de administración', 'Soporte prioritario'],
      price: 'Desde US$2,990',
      cta: 'Solicitar paquete completo',
      featured: true,
      badge: 'Más completo',
      accent: '#2B7FFF',
    },
    {
      name: 'Paquete Smart TV',
      desc: 'Enfocado en pantallas grandes y la experiencia de sala de estar',
      includes: ['Android TV', 'Samsung TV', 'LG TV', 'Diseño para pantalla grande', 'Control remoto'],
      price: 'Desde US$1,297',
      cta: 'Solicitar paquete Smart TV',
      featured: false,
      accent: '#2B7FFF',
    },
  ]

  return (
    <section id="packages" className="py-24 px-6" style={{ background: '#F7FAFF' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Paquetes recomendados</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Soluciones <span className="gradient-text">listas para escalar</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {pkgs.map(p => (
            <div
              key={p.name}
              className="rounded-2xl p-7 flex flex-col relative overflow-hidden"
              style={{
                background: p.featured ? 'linear-gradient(135deg, #0D1B3E, #1A2F5A)' : '#fff',
                border: p.featured ? 'none' : '1.5px solid #E8EEF8',
                boxShadow: p.featured ? '0 16px 48px rgba(43,127,255,0.25)' : '0 4px 16px rgba(13,27,62,0.06)',
              }}
            >
              {p.badge && (
                <div className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-display font-700" style={{ background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)', color: 'white' }}>
                  {p.badge}
                </div>
              )}
              <div className="font-display font-800 text-xl mb-2" style={{ color: p.featured ? '#fff' : '#0D1B3E' }}>{p.name}</div>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: p.featured ? '#A8BDE0' : '#4A5B7A' }}>{p.desc}</p>
              <ul className="space-y-2 mb-8 flex-1">
                {p.includes.map(i => (
                  <li key={i} className="flex items-center gap-2 text-sm" style={{ color: p.featured ? '#C5D5F5' : '#4A5B7A' }}>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 20 20" fill={p.featured ? '#5599FF' : '#2B7FFF'}>
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="mb-5">
                <span className="text-xs" style={{ color: p.featured ? '#7A8BAA' : '#7A8BAA' }}>Precio estimado</span>
                <div className="font-display font-700 text-2xl" style={{ color: p.featured ? '#fff' : '#0D1B3E' }}>{p.price}</div>
              </div>
              <a
                href="/contacto"
                className="block text-center py-3 rounded-xl text-sm font-display font-600 transition-all"
                style={p.featured
                  ? { background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)', color: 'white' }
                  : { border: '1.5px solid #2B7FFF', color: '#2B7FFF', background: '#EEF4FF' }
                }
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { n: '01', title: 'Selecciona las plataformas', desc: 'Elige en cuáles sistemas operativos deseas lanzar tu aplicación IPTV.' },
    { n: '02', title: 'Envía tu identidad visual', desc: 'Comparte el nombre, logo, colores y elementos de marca de tu empresa.' },
    { n: '03', title: 'Proporciona datos IPTV', desc: 'Entregamos los datos de conexión de tu sistema o panel IPTV para la integración.' },
    { n: '04', title: 'Desarrollo y pruebas', desc: 'Desarrollamos y probamos cada aplicación en los dispositivos correspondientes.' },
    { n: '05', title: 'Entrega y publicación', desc: 'Recibes los instaladores o iniciamos el proceso de publicación en las tiendas oficiales.' },
  ]

  return (
    <section id="process" className="py-24 px-6" style={{ background: '#fff' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-label mb-3">Proceso</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Cómo funciona
          </h2>
          <p style={{ color: '#4A5B7A', maxWidth: 480, margin: '0 auto' }}>
            Un proceso claro de 5 pasos desde la selección hasta la entrega de tu aplicación.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C5D5F5, #D0C5F5, transparent)' }} />

          <div className="grid lg:grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <div key={s.n} className="relative text-center lg:text-left">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-5 relative z-10"
                  style={{ background: i % 2 === 0 ? 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' : 'linear-gradient(135deg, #4A8FFF, #2B7FFF)', boxShadow: '0 4px 20px rgba(43,127,255,0.25)' }}
                >
                  <span className="font-display font-800 text-white text-lg">{s.n}</span>
                </div>
                <h3 className="font-display font-700 mb-2" style={{ color: '#0D1B3E' }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#4A5B7A' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6" style={{ background: '#F7FAFF' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="section-label mb-3">Preguntas frecuentes</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Respuestas claras
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all"
              style={{ background: '#fff', border: open === i ? '1.5px solid #2B7FFF' : '1.5px solid #E8EEF8', boxShadow: open === i ? '0 4px 16px rgba(43,127,255,0.08)' : 'none' }}
            >
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-display font-600 text-sm pr-4" style={{ color: '#0D1B3E' }}>{f.q}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0 transition-transform duration-200"
                  style={{ color: '#2B7FFF', transform: open === i ? 'rotate(180deg)' : '' }}
                  viewBox="0 0 20 20" fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#4A5B7A' }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl text-sm leading-relaxed" style={{ background: '#EEF4FF', border: '1.5px solid #C5D5F5', color: '#4A5B7A' }}>
          <strong style={{ color: '#0D1B3E' }}>Aviso importante:</strong> La empresa desarrolla únicamente el software y la interfaz. El cliente es responsable de contar con las licencias, autorizaciones y derechos necesarios sobre el contenido que distribuye.
        </div>
      </div>
    </section>
  )
}

function QuoteForm() {
  const [form, setForm] = useState<QuoteFormState>({
    name: '', company: '', country: '', whatsapp: '', email: '',
    clients: '', platforms: [], iptv_panel: '',
    store_publish: '', admin_panel: '', budget: '', description: '',
  })
  const [sent, setSent] = useState(false)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const platforms = getManagedPlatforms()
  const selectedPlatforms = platforms.filter(p => form.platforms.includes(p.id))
  const estimatedTotal = selectedPlatforms.reduce((sum, platform) => sum + platform.price, 0)

  const handleCheck = (id: string) => {
    setForm(f => ({
      ...f,
      platforms: f.platforms.includes(id) ? f.platforms.filter(p => p !== id) : [...f.platforms, id],
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const submittedForm = {
      ...form,
      name: String(data.get('name') ?? form.name),
      company: String(data.get('company') ?? form.company),
      country: String(data.get('country') ?? form.country),
      whatsapp: String(data.get('whatsapp') ?? form.whatsapp),
      email: String(data.get('email') ?? form.email),
      clients: String(data.get('clients') ?? form.clients),
      iptv_panel: String(data.get('iptv_panel') ?? form.iptv_panel),
      store_publish: String(data.get('store_publish') ?? form.store_publish),
      admin_panel: String(data.get('admin_panel') ?? form.admin_panel),
      budget: String(data.get('budget') ?? form.budget),
      description: String(data.get('description') ?? form.description),
    }
    const quote = saveLocalQuote({
      name: submittedForm.name || 'Sin nombre',
      company: submittedForm.company || 'Sin empresa',
      country: submittedForm.country,
      email: submittedForm.email,
      whatsapp: submittedForm.whatsapp,
      clients: submittedForm.clients,
      platforms: submittedForm.platforms,
      iptv_panel: submittedForm.iptv_panel,
      store_publish: submittedForm.store_publish,
      admin_panel: submittedForm.admin_panel,
      budget: submittedForm.budget,
      description: submittedForm.description,
      estimatedTotal,
    })
    const message = [
      `Hola, quiero una cotización IPTV (${quote.id}).`,
      `Nombre: ${submittedForm.name}`,
      `Empresa: ${submittedForm.company}`,
      `País: ${submittedForm.country}`,
      `WhatsApp: ${submittedForm.whatsapp}`,
      `Email: ${submittedForm.email}`,
      `Plataformas: ${selectedPlatforms.map(p => p.name).join(', ') || 'Por definir'}`,
      `Total estimado: US$${estimatedTotal}`,
      `Clientes aproximados: ${submittedForm.clients || 'Por definir'}`,
      `Panel IPTV: ${submittedForm.iptv_panel || 'Por definir'}`,
      `Publicación en tiendas: ${submittedForm.store_publish || 'Por definir'}`,
      `Panel de administración: ${submittedForm.admin_panel || 'Por definir'}`,
      `Presupuesto: ${submittedForm.budget || 'Por definir'}`,
      `Descripción: ${submittedForm.description || 'Sin detalles adicionales'}`,
    ].join('\n')
    setWhatsappUrl(`https://wa.me/?text=${encodeURIComponent(message)}`)
    setSent(true)
  }

  const inputStyle = {
    background: '#F7FAFF',
    border: '1.5px solid #E8EEF8',
    color: '#0D1B3E',
  }
  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderColor = '#2B7FFF')
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => (e.target.style.borderColor = '#E8EEF8')

  if (sent) {
    return (
      <section id="contact" className="py-24 px-6 text-center" style={{ background: '#fff' }}>
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background: 'linear-gradient(135deg, #2B7FFF, #1A5FCC)' }}>
            <svg className="w-8 h-8 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
            </svg>
          </div>
          <h3 className="font-display font-700 text-2xl mb-3" style={{ color: '#0D1B3E' }}>¡Solicitud enviada!</h3>
          <p className="mb-6" style={{ color: '#4A5B7A' }}>Guardamos la cotización en el panel admin. También puedes enviarla por WhatsApp.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary inline-block px-6 py-3 rounded-xl text-sm text-white">
            <span>Enviar por WhatsApp</span>
          </a>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#fff' }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label mb-3">Cotización</div>
          <h2 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#0D1B3E' }}>
            Solicita tu <span className="gradient-text">cotización personalizada</span>
          </h2>
          <p style={{ color: '#4A5B7A' }}>Completa el formulario y recibirás una propuesta detallada sin costo.</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-8 space-y-5" style={{ background: '#fff', border: '1.5px solid #E8EEF8', boxShadow: '0 8px 32px rgba(43,127,255,0.08)' }}>
          <div className="grid sm:grid-cols-2 gap-5">
            {([
              { label: 'Nombre completo', key: 'name', type: 'text', placeholder: 'Ej. Carlos Rodríguez' },
              { label: 'Nombre de la empresa', key: 'company', type: 'text', placeholder: 'Ej. MiTV Solutions' },
              { label: 'País', key: 'country', type: 'text', placeholder: 'Ej. México' },
              { label: 'WhatsApp', key: 'whatsapp', type: 'tel', placeholder: '+52 55 1234 5678' },
              { label: 'Correo electrónico', key: 'email', type: 'email', placeholder: 'correo@empresa.com' },
              { label: 'Clientes aproximados', key: 'clients', type: 'text', placeholder: 'Ej. 500' },
            ] satisfies { label: string; key: QuoteTextFieldKey; type: string; placeholder: string }[]).map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>{label}</label>
                <input
                  name={key}
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-display font-500 mb-2.5" style={{ color: '#4A5B7A' }}>Plataformas de interés</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {platforms.map(p => (
                <label key={p.id} className="flex items-center gap-2 cursor-pointer">
                  <div
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
                    style={{ background: form.platforms.includes(p.id) ? '#2B7FFF' : 'transparent', border: form.platforms.includes(p.id) ? 'none' : '2px solid #C5D5F5' }}
                    onClick={() => handleCheck(p.id)}
                  >
                    {form.platforms.includes(p.id) && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm" style={{ color: '#4A5B7A' }}>{p.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: '#F7FAFF', border: '1.5px solid #E8EEF8' }}>
            <div>
              <p className="text-xs font-display font-600 uppercase" style={{ color: '#7A8BAA' }}>Estimado local</p>
              <p className="text-sm" style={{ color: '#4A5B7A' }}>{selectedPlatforms.length} plataformas seleccionadas</p>
            </div>
            <div className="font-display font-800 text-2xl" style={{ color: '#0D1B3E' }}>US${estimatedTotal}</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {([
              { label: 'Panel / Sistema IPTV', key: 'iptv_panel', placeholder: 'Ej. Xtream Codes, Stalker...' },
              { label: 'Presupuesto aproximado', key: 'budget', placeholder: 'Ej. US$500 – US$2,000' },
            ] satisfies { label: string; key: QuoteTextFieldKey; placeholder: string }[]).map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>{label}</label>
                <input
                  name={key}
                  type="text"
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {([
              { label: '¿Necesita publicación en tiendas?', key: 'store_publish' },
              { label: '¿Necesita panel de administración?', key: 'admin_panel' },
            ] satisfies { label: string; key: QuoteTextFieldKey }[]).map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>{label}</label>
                <select
                  name={key}
                  value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                  style={{ ...inputStyle, color: form[key] ? '#0D1B3E' : '#9AAABB' }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                >
                  <option value="">Seleccionar...</option>
                  <option value="si">Sí</option>
                  <option value="no">No</option>
                  <option value="consultar">Consultar</option>
                </select>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>Descripción del proyecto</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Cuéntanos más sobre tu proyecto, tus objetivos y cualquier detalle adicional..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none resize-none transition-all"
              style={{ ...inputStyle, color: '#0D1B3E' }}
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-3.5 rounded-xl text-white text-base">
            <span>Recibir cotización</span>
          </button>
        </form>
      </div>
    </section>
  )
}

function AdminLogin() {
  const [email, setEmail] = useState('admin@fast.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    let admin: LocalAdmin | undefined

    try {
      const response = await apiRequest<{ admin: LocalAdmin }>('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      admin = response.admin
    } catch {
      const db = getLocalDb()
      admin = db.admins.find(user => user.email === email && user.password === password)
    }

    if (!admin) {
      setError('Credenciales incorrectas')
      return
    }

    setAdminSession(admin.email)
    window.location.href = '/admin'
  }

  return (
    <section className="min-h-screen pt-28 pb-16 px-6" style={{ background: '#F7FAFF' }}>
      <div className="max-w-md mx-auto rounded-2xl p-8" style={{ background: '#fff', border: '1.5px solid #E8EEF8', boxShadow: '0 8px 32px rgba(43,127,255,0.08)' }}>
        <div className="section-label mb-3">Admin</div>
        <h1 className="font-display font-800 text-3xl mb-2" style={{ color: '#0D1B3E' }}>Panel administrativo</h1>
        <p className="text-sm mb-8" style={{ color: '#4A5B7A' }}>Ingresa con el usuario semilla local.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>Correo</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: '#F7FAFF', border: '1.5px solid #E8EEF8', color: '#0D1B3E' }}
            />
          </div>

          <div>
            <label className="block text-sm font-display font-500 mb-1.5" style={{ color: '#4A5B7A' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none"
              style={{ background: '#F7FAFF', border: '1.5px solid #E8EEF8', color: '#0D1B3E' }}
            />
          </div>

          {error && <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>}

          <button type="submit" className="btn-primary w-full py-3 rounded-xl text-white">
            <span>Entrar</span>
          </button>
        </form>
      </div>
    </section>
  )
}

function AdminDashboard() {
  const session = getAdminSession()
  const [db, setDb] = useState<LocalDb>(() => getLocalDb())
  const [activeModule, setActiveModule] = useState('Dashboard')
  const [saved, setSaved] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<LocalQuote | null>(null)
  const totalQuotes = db.quotes.length
  const totalRevenue = db.quotes.reduce((sum, quote) => sum + quote.estimatedTotal, 0)
  const managedPlatforms = getManagedPlatforms()
  const platformCount = managedPlatforms.length
  const servicesCount = db.services.filter(service => service.enabled).length
  const pendingQuotes = db.quotes.filter(quote => quote.status === 'Nuevo').length

  useEffect(() => {
    const refresh = () => setDb(getLocalDb())
    window.addEventListener('vaelo-db-updated', refresh)
    return () => window.removeEventListener('vaelo-db-updated', refresh)
  }, [])

  if (!session) return <AdminLogin />

  const platformName = (id: string) => managedPlatforms.find(p => p.id === id)?.name ?? id
  const maxQuote = Math.max(...db.quotes.map(quote => quote.estimatedTotal), 1)
  const sidebarItems = ['Dashboard', 'Cotizaciones', 'Clientes', 'Plataformas', 'Servicios', 'Contacto', 'Reportes', 'Configuración']
  const statCards = [
    { label: 'Cotizaciones', value: totalQuotes, hint: `${pendingQuotes} nuevas por revisar`, color: '#2B7FFF' },
    { label: 'Ingresos estimados', value: `US$${totalRevenue}`, hint: 'Valor acumulado local', color: '#00A86B' },
    { label: 'Plataformas', value: platformCount, hint: 'Catálogo disponible', color: '#7B4EFF' },
    { label: 'Servicios', value: servicesCount, hint: 'Extras comerciales', color: '#F59E0B' },
  ]

  const logout = () => {
    clearAdminSession()
    window.location.href = '/admin/login'
  }

  const saveDb = (nextDb: LocalDb, message = 'Cambios guardados') => {
    setDb(nextDb)
    cachedDb = nextDb
    localStorage.setItem(LOCAL_DB_KEY, JSON.stringify(nextDb))
    persistRemoteDb(nextDb)
    setSaved(message)
    window.setTimeout(() => setSaved(''), 1800)
  }

  const updatePlatformPrice = (id: string, price: number) => {
    saveDb({ ...db, platformPrices: { ...db.platformPrices, [id]: price } }, 'Precio actualizado')
  }

  const updateService = (index: number, patch: Partial<LocalDb['services'][number]>) => {
    const services = db.services.map((service, serviceIndex) => serviceIndex === index ? { ...service, ...patch } : service)
    saveDb({ ...db, services }, 'Servicio actualizado')
  }

  const updateQuoteStatus = (id: string, status: string) => {
    const quotes = db.quotes.map(quote => quote.id === id ? { ...quote, status } : quote)
    saveDb({ ...db, quotes }, 'Solicitud actualizada')
  }

  const updateContactSetting = (key: keyof LocalDb['contactSettings'], value: string) => {
    saveDb({ ...db, contactSettings: { ...db.contactSettings, [key]: value } }, 'Contacto actualizado')
  }

  return (
    <section className="min-h-screen admin-shell" style={{ background: '#EEF3FA' }}>
      <aside className="admin-sidebar">
        <div className="px-6 py-7 flex justify-center">
          <a href="/" className="admin-brand">
            <img src="/imgs/vaelo_icono.png" alt="" className="admin-brand-icon" />
            <span>VAELO</span>
          </a>
        </div>
        <div className="px-6 pb-7 flex flex-col items-center text-center">
          <div className="admin-avatar">VA</div>
          <p className="font-display font-700 text-white mt-3">Admin VAELO</p>
          <p className="text-xs" style={{ color: '#95A3B8' }}>{session.email}</p>
        </div>
        <nav className="px-5 space-y-1.5">
          {sidebarItems.map(item => (
            <button key={item} onClick={() => setActiveModule(item)} className={`admin-nav-item ${activeModule === item ? 'active' : ''}`}>
              <span className="admin-nav-dot" />
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="text-xs font-display font-700 uppercase tracking-[0.18em]" style={{ color: '#2B7FFF' }}>{activeModule}</p>
            <h1 className="font-display font-800 text-3xl" style={{ color: '#071733' }}>Panel administrativo</h1>
            {saved && <p key={saved} className="admin-save-toast">{saved}</p>}
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="admin-ghost-button">Ver web</a>
            <button onClick={logout} className="admin-primary-button">Cerrar sesión</button>
          </div>
        </header>

        <div key={activeModule} className="admin-content admin-module-enter">
          {activeModule === 'Dashboard' && (
            <>
          <section className="admin-hero-panel">
            <div>
              <h2 className="font-display font-800 text-2xl mb-2" style={{ color: '#071733' }}>Resumen general</h2>
              <p className="text-sm" style={{ color: '#60708A' }}>Actividad local de cotizaciones, catálogo comercial y valor estimado de proyectos.</p>
            </div>
            <div className="admin-user-card">
              <div className="admin-avatar small">VA</div>
              <div>
                <p className="font-display font-700" style={{ color: '#071733' }}>Administrador</p>
                <p className="text-xs" style={{ color: '#60708A' }}>Base local activa</p>
              </div>
            </div>
          </section>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {statCards.map(card => (
              <div key={card.label} className="admin-stat-card">
                <div className="flex items-center justify-between mb-5">
                  <div className="admin-stat-icon" style={{ background: `${card.color}18`, color: card.color }}>{card.label.slice(0, 1)}</div>
                  <span className="admin-mini-line" style={{ background: `linear-gradient(90deg, transparent, ${card.color})` }} />
                </div>
                <p className="text-sm font-display font-600" style={{ color: '#31415C' }}>{card.label}</p>
                <p className="font-display font-800 text-3xl mt-1" style={{ color: '#071733' }}>{card.value}</p>
                <p className="text-xs mt-2" style={{ color: '#60708A' }}>{card.hint}</p>
              </div>
            ))}
          </div>

          <div className="grid xl:grid-cols-[1.5fr_0.8fr] gap-5">
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Valor por cotización</h2>
                  <p className="text-xs" style={{ color: '#60708A' }}>Comparativa rápida de oportunidades</p>
                </div>
                <span className="admin-badge">Julio 2026</span>
              </div>
              <div className="admin-chart">
                {db.quotes.map(quote => (
                  <div key={quote.id} className="admin-chart-row">
                    <span>{quote.id}</span>
                    <div className="admin-chart-track">
                      <div className="admin-chart-bar" style={{ width: `${Math.max((quote.estimatedTotal / maxQuote) * 100, 8)}%` }} />
                    </div>
                    <strong>US${quote.estimatedTotal}</strong>
                  </div>
                ))}
              </div>
            </section>

            <section className="admin-panel">
              <div className="admin-panel-header">
                <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Actividad</h2>
              </div>
              <div className="space-y-4">
                {db.quotes.slice(0, 4).map(quote => (
                  <div key={quote.id} className="admin-activity-item">
                    <span className="admin-activity-dot" />
                    <div>
                      <p className="font-display font-700 text-sm" style={{ color: '#071733' }}>{quote.company}</p>
                      <p className="text-xs" style={{ color: '#60708A' }}>{quote.status} · {quote.createdAt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="admin-panel overflow-hidden">
            <div className="admin-panel-header">
              <div>
                <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Cotizaciones recientes</h2>
                <p className="text-xs" style={{ color: '#60708A' }}>Solicitudes capturadas desde la web</p>
              </div>
              <button className="admin-ghost-button">Exportar</button>
            </div>
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    {['ID', 'Cliente', 'Empresa', 'Plataformas', 'Estado', 'Estimado', ''].map(head => (
                      <th key={head}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {db.quotes.map(quote => (
                    <tr key={quote.id}>
                      <td className="font-display font-700" style={{ color: '#2B7FFF' }}>{quote.id}</td>
                      <td>
                        <div className="font-display font-700" style={{ color: '#071733' }}>{quote.name}</div>
                        <div className="text-xs" style={{ color: '#7A8BAA' }}>{quote.email}</div>
                      </td>
                      <td>{quote.company}</td>
                      <td>{quote.platforms.map(platformName).join(', ')}</td>
                      <td><span className="admin-badge">{quote.status}</span></td>
                      <td className="font-display font-800" style={{ color: '#071733' }}>US${quote.estimatedTotal}</td>
                      <td>
                        <button className="admin-icon-button" onClick={() => setSelectedQuote(quote)} aria-label="Ver detalle">•••</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
            </>
          )}

          {activeModule === 'Plataformas' && (
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Precios de plataformas</h2>
                  <p className="text-xs" style={{ color: '#60708A' }}>Estos precios se reflejan en la web y el cotizador.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {managedPlatforms.map(platform => (
                  <div key={platform.id} className="admin-edit-card">
                    <div>
                      <p className="font-display font-800" style={{ color: '#071733' }}>{platform.name}</p>
                      <p className="text-xs" style={{ color: '#60708A' }}>{platform.description}</p>
                    </div>
                    <label className="admin-field">
                      <span>Precio base US$</span>
                      <input type="number" value={db.platformPrices[platform.id] ?? platform.price} onChange={e => updatePlatformPrice(platform.id, Number(e.target.value))} />
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'Servicios' && (
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Servicios adicionales</h2>
                  <p className="text-xs" style={{ color: '#60708A' }}>Activa, desactiva y ajusta precios visibles en la web.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {db.services.map((service, index) => (
                  <div key={`${service.name}-${index}`} className="admin-edit-card">
                    <label className="admin-toggle-row">
                      <input type="checkbox" checked={service.enabled} onChange={e => updateService(index, { enabled: e.target.checked })} />
                      <span>{service.enabled ? 'Visible' : 'Oculto'}</span>
                    </label>
                    <label className="admin-field">
                      <span>Servicio</span>
                      <input value={service.name} onChange={e => updateService(index, { name: e.target.value })} />
                    </label>
                    <label className="admin-field">
                      <span>Precio</span>
                      <input value={service.price} onChange={e => updateService(index, { price: e.target.value })} />
                    </label>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(activeModule === 'Cotizaciones' || activeModule === 'Clientes') && (
            <section className="admin-panel overflow-hidden">
              <div className="admin-panel-header">
                <div>
                  <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>{activeModule === 'Clientes' ? 'Clientes y contactos' : 'Solicitudes de cotización'}</h2>
                  <p className="text-xs" style={{ color: '#60708A' }}>Datos recibidos desde el formulario web.</p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="admin-table">
                  <thead>
                    <tr>
                      {['ID', 'Cliente', 'Empresa', 'WhatsApp', 'Plataformas', 'Estado', 'Estimado', ''].map(head => <th key={head}>{head}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {db.quotes.map(quote => (
                      <tr key={quote.id}>
                        <td className="font-display font-700" style={{ color: '#2B7FFF' }}>{quote.id}</td>
                        <td>
                          <div className="font-display font-700" style={{ color: '#071733' }}>{quote.name}</div>
                          <div className="text-xs" style={{ color: '#7A8BAA' }}>{quote.email}</div>
                        </td>
                        <td>{quote.company}</td>
                        <td>{quote.whatsapp || '-'}</td>
                        <td>{quote.platforms.map(platformName).join(', ')}</td>
                        <td>
                          <select className="admin-select" value={quote.status} onChange={e => updateQuoteStatus(quote.id, e.target.value)}>
                            <option>Nuevo</option>
                            <option>En revision</option>
                            <option>Contactado</option>
                            <option>Cerrado</option>
                            <option>Descartado</option>
                          </select>
                        </td>
                        <td className="font-display font-800" style={{ color: '#071733' }}>US${quote.estimatedTotal}</td>
                        <td>
                          <button className="admin-icon-button" onClick={() => setSelectedQuote(quote)} aria-label="Ver detalle">•••</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeModule === 'Contacto' && (
            <section className="admin-panel">
              <div className="admin-panel-header">
                <div>
                  <h2 className="font-display font-800 text-xl" style={{ color: '#071733' }}>Datos de contacto</h2>
                  <p className="text-xs" style={{ color: '#60708A' }}>Información base para mostrar y usar en solicitudes.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {([
                  ['email', 'Correo comercial'],
                  ['whatsapp', 'WhatsApp'],
                  ['country', 'País'],
                  ['responseTime', 'Tiempo de respuesta'],
                ] as [keyof LocalDb['contactSettings'], string][]).map(([key, label]) => (
                  <label key={key} className="admin-field">
                    <span>{label}</span>
                    <input value={db.contactSettings[key]} onChange={e => updateContactSetting(key, e.target.value)} />
                  </label>
                ))}
              </div>
            </section>
          )}

          {(activeModule === 'Reportes' || activeModule === 'Configuración') && (
            <section className="admin-panel">
              <h2 className="font-display font-800 text-xl mb-2" style={{ color: '#071733' }}>{activeModule}</h2>
              <p className="text-sm" style={{ color: '#60708A' }}>Módulo preparado para la siguiente etapa cuando conectemos una base de datos real.</p>
            </section>
          )}
        </div>
        {selectedQuote && (
          <div className="admin-modal-backdrop" onClick={() => setSelectedQuote(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-panel-header">
                <div>
                  <p className="text-xs font-display font-700 uppercase tracking-[0.18em]" style={{ color: '#2B7FFF' }}>{selectedQuote.id}</p>
                  <h2 className="font-display font-800 text-2xl" style={{ color: '#071733' }}>{selectedQuote.name}</h2>
                </div>
                <button className="admin-icon-button" onClick={() => setSelectedQuote(null)} aria-label="Cerrar">×</button>
              </div>

              <div className="admin-detail-grid">
                {[
                  ['Empresa', selectedQuote.company],
                  ['Correo', selectedQuote.email],
                  ['WhatsApp', selectedQuote.whatsapp],
                  ['País', selectedQuote.country],
                  ['Clientes aproximados', selectedQuote.clients],
                  ['Panel IPTV', selectedQuote.iptv_panel],
                  ['Publicación en tiendas', selectedQuote.store_publish],
                  ['Panel de administración', selectedQuote.admin_panel],
                  ['Presupuesto', selectedQuote.budget],
                  ['Estado', selectedQuote.status],
                  ['Fecha', selectedQuote.createdAt],
                  ['Estimado', `US$${selectedQuote.estimatedTotal}`],
                ].map(([label, value]) => (
                  <div key={label} className="admin-detail-item">
                    <span>{label}</span>
                    <strong>{value || '-'}</strong>
                  </div>
                ))}
              </div>

              <div className="admin-detail-item mt-4">
                <span>Plataformas</span>
                <strong>{selectedQuote.platforms.map(platformName).join(', ') || '-'}</strong>
              </div>

              <div className="admin-detail-item mt-4">
                <span>Descripción del proyecto</span>
                <p>{selectedQuote.description || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </section>
  )
}

function Footer() {
  const platformNames = getManagedPlatforms().map(p => p.name)

  return (
    <footer className="footer-premium">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center">
              <img src="/imgs/vaelo_logo.png" alt="VAELO" className="h-12 w-auto object-contain footer-logo" />
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: '#C9D7F2', maxWidth: 270 }}>
              Desarrollamos aplicaciones IPTV white-label para proveedores, cableoperadores y distribuidores de contenido.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="/contacto" className="px-3 py-2 rounded-lg text-xs font-display font-600 transition-all" style={{ background: 'rgba(37,211,102,0.1)', color: '#25D366', border: '1px solid rgba(37,211,102,0.2)' }}>
                WhatsApp
              </a>
              <a href="/contacto" className="px-3 py-2 rounded-lg text-xs font-display font-600 transition-all" style={{ border: '1px solid rgba(43,127,255,0.4)', color: '#5599FF' }}>
                Email
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-700 text-white text-sm mb-4">Plataformas</h4>
            <ul className="space-y-2">
              {platformNames.map(n => (
                <li key={n}><a href="/plataformas" className="text-sm transition-colors" style={{ color: '#7A8BAA' }}>{n}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white text-sm mb-4">Servicios</h4>
            <ul className="space-y-2">
              {['Publicación en tiendas', 'Panel de administración', 'Notificaciones push', 'Hosting', 'Mantenimiento', 'Diseño exclusivo'].map(s => (
                <li key={s}><a href="/contacto" className="text-sm transition-colors" style={{ color: '#7A8BAA' }}>{s}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-700 text-white text-sm mb-4">Empresa</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Plataformas', href: '/plataformas' },
                { label: 'Precios', href: '/precios' },
                { label: 'Proceso', href: '/proceso' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contacto', href: '/contacto' },
                { label: 'Admin', href: '/admin/login' },
              ].map(l => (
                <li key={l.href}><a href={l.href} className="text-sm transition-colors" style={{ color: '#7A8BAA' }}>{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid rgba(43,127,255,0.1)' }}>
          <p className="text-xs" style={{ color: '#91A4C6' }}>
            © 2026 VAELO. Todos los derechos reservados.
          </p>
          <div className="flex gap-5">
            {['Política de privacidad', 'Términos y condiciones'].map(l => (
              <a key={l} href="/contacto" className="text-xs transition-colors" style={{ color: '#B8C8E6' }}>{l}</a>
            ))}
          </div>
        </div>
        <p className="text-xs mt-5 leading-relaxed" style={{ color: '#91A4C6', maxWidth: 880 }}>
          Aviso legal: VAELO desarrolla exclusivamente el software y la interfaz de las aplicaciones. El cliente es el único responsable de obtener y mantener las licencias, autorizaciones y derechos legales sobre el contenido que distribuye, así como del cumplimiento de la legislación aplicable en materia de derechos de autor y propiedad intelectual en su jurisdicción.
        </p>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

const ROUTES: Record<string, React.ReactElement> = {
  '/': <HomePage />,
  '/plataformas': <EnhancedPlatformSection />,
  '/precios': <EnhancedPackageBuilder />,
  '/comparacion': <ComparisonTable />,
  '/personalizacion': <EnhancedCustomization />,
  '/servicios': <EnhancedAdditionalServices />,
  '/paquetes': <RecommendedPackages />,
  '/proceso': <HowItWorks />,
  '/faq': <FAQ />,
  '/contacto': <EnhancedQuoteForm />,
  '/admin/login': <AdminLogin />,
  '/admin': <AdminDashboard />,
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'VAELO | Aplicaciones IPTV white-label',
  '/plataformas': 'Plataformas | VAELO',
  '/precios': 'Precios | VAELO',
  '/comparacion': 'Comparación | VAELO',
  '/personalizacion': 'Personalización | VAELO',
  '/servicios': 'Servicios | VAELO',
  '/paquetes': 'Paquetes | VAELO',
  '/proceso': 'Proceso | VAELO',
  '/faq': 'FAQ | VAELO',
  '/contacto': 'Cotización | VAELO',
  '/admin/login': 'Login Admin | VAELO',
  '/admin': 'Panel Admin | VAELO',
}

function resolvePage(pathname: string) {
  if (ROUTES[pathname]) return ROUTES[pathname]

  if (pathname.startsWith('/plataformas/')) {
    const slug = pathname.split('/').filter(Boolean)[1]
    const platform = slug ? getPlatformBySlug(slug) : undefined
    if (platform) return <EnhancedPlatformDetailPage platform={platform} />
  }

  return <NotFound />
}

function getPageTitle(pathname: string) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.startsWith('/plataformas/')) {
    const slug = pathname.split('/').filter(Boolean)[1]
    const platform = slug ? getPlatformBySlug(slug) : undefined
    if (platform) return `${platform.name} | VAELO`
  }
  return 'Página no encontrada | VAELO'
}

function NotFound() {
  return (
    <section className="py-32 px-6 text-center" style={{ background: '#fff' }}>
      <div className="max-w-xl mx-auto">
        <div className="section-label mb-3">404</div>
        <h1 className="font-display font-800 mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#0D1B3E' }}>
          Página no encontrada
        </h1>
        <p className="mb-8" style={{ color: '#4A5B7A' }}>
          La URL que intentas abrir no existe dentro de VAELO.
        </p>
        <a href="/" className="btn-primary inline-block px-6 py-3 rounded-xl text-sm text-white">
          <span>Volver al inicio</span>
        </a>
      </div>
    </section>
  )
}

export default function App() {
  const [, refreshDb] = useState(0)
  const pathname = window.location.pathname.replace(/\/$/, '') || '/'
  const page = resolvePage(pathname)
  const isAdminPage = pathname.startsWith('/admin')

  useEffect(() => {
    const refresh = () => refreshDb(value => value + 1)
    window.addEventListener('vaelo-db-updated', refresh)
    loadRemoteDb().catch(error => {
      console.warn('Usando datos locales porque MySQL/API no respondio', error)
    })
    return () => window.removeEventListener('vaelo-db-updated', refresh)
  }, [])

  useEffect(() => {
    document.title = getPageTitle(pathname)
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', 'Desarrollo de aplicaciones IPTV white-label para Android, Smart TV, iOS, Windows y web.')
  }, [pathname])

  useEffect(() => {
    if (pathname.startsWith('/admin')) return

    let observer: IntersectionObserver | null = null
    const timer = window.setTimeout(() => {
      const elements = Array.from(document.querySelectorAll<HTMLElement>(
        [
          'section:not(#hero)',
          'section:not(#hero) .section-label',
          'section:not(#hero) h2',
          '.platform-card',
          'form',
          'aside',
        ].join(','),
      ))

      elements.forEach((element, index) => {
        element.classList.add('scroll-reveal')
        element.style.setProperty('--scroll-delay', `${Math.min(index % 5, 4) * 45}ms`)

        if (element.classList.contains('platform-card')) {
          element.classList.add(index % 2 === 0 ? 'scroll-reveal-left' : 'scroll-reveal-right')
        }
      })

      const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          scrollObserver.unobserve(entry.target)
        })
      }, { threshold: 0.06, rootMargin: '0px 0px -14% 0px' })

      observer = scrollObserver
      elements.forEach(element => scrollObserver.observe(element))
    }, 180)

    return () => {
      window.clearTimeout(timer)
      observer?.disconnect()
    }
  }, [pathname])

  return (
    <div className={`min-h-screen ${isAdminPage ? '' : 'vaelo-app-shell'}`} style={{ color: '#0D1B3E' }}>
      {!isAdminPage && <Navbar />}
      {page}
      {!isAdminPage && <Footer />}
    </div>
  )
}

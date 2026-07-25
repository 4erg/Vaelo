import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import mysql from 'mysql2/promise'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const port = Number(process.env.PORT || 3000)
const dbName = process.env.DB_DATABASE || 'db_vaelo'
const dbUser = process.env.DB_USERNAME || 'vaelo'

app.use(cors())
app.use(express.json({ limit: '1mb' }))

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: dbUser,
  password: process.env.DB_PASSWORD || '',
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
})

function toNumber(value) {
  return value === null || value === undefined ? undefined : Number(value)
}

function parseJsonField(value, fallback = []) {
  if (Array.isArray(value)) return value
  if (!value) return fallback
  return JSON.parse(value)
}

function mapQuote(row) {
  return {
    id: row.id,
    name: row.name,
    company: row.company,
    country: row.country || '',
    email: row.email || '',
    whatsapp: row.whatsapp || '',
    clients: row.clients || '',
    platforms: parseJsonField(row.platforms),
    services: parseJsonField(row.services),
    iptv_panel: row.iptv_panel || '',
    store_publish: row.store_publish || '',
    admin_panel: row.admin_panel || '',
    budget: row.budget || '',
    description: row.description || '',
    appName: row.app_name || '',
    website: row.website || '',
    desiredDelivery: row.desired_delivery || '',
    logoName: row.logo_name || '',
    subtotal: toNumber(row.subtotal),
    discountAmount: toNumber(row.discount_amount),
    monthlyTotal: toNumber(row.monthly_total),
    oneTimeTotal: toNumber(row.one_time_total),
    suggestedDeposit: toNumber(row.suggested_deposit),
    remainingBalance: toNumber(row.remaining_balance),
    status: row.status,
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString().slice(0, 10) : String(row.created_at),
    estimatedTotal: Number(row.estimated_total),
  }
}

async function insertQuote(quote) {
  await pool.query(
    `INSERT INTO quotes
      (id, name, company, country, email, whatsapp, clients, platforms, services, iptv_panel, store_publish, admin_panel, budget, description, app_name, website, desired_delivery, logo_name, subtotal, discount_amount, monthly_total, one_time_total, suggested_deposit, remaining_balance, status, created_at, estimated_total)
      VALUES (?, ?, ?, ?, ?, ?, ?, CAST(? AS JSON), CAST(? AS JSON), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      quote.id, quote.name, quote.company, quote.country || null, quote.email || null, quote.whatsapp || null, quote.clients || null,
      JSON.stringify(quote.platforms || []), JSON.stringify(quote.services || []), quote.iptv_panel || null, quote.store_publish || null,
      quote.admin_panel || null, quote.budget || null, quote.description || null, quote.appName || null, quote.website || null,
      quote.desiredDelivery || null, quote.logoName || null, quote.subtotal ?? null, quote.discountAmount ?? null,
      quote.monthlyTotal ?? null, quote.oneTimeTotal ?? null, quote.suggestedDeposit ?? null, quote.remainingBalance ?? null,
      quote.status || 'Nuevo', quote.createdAt || new Date().toISOString().slice(0, 10), quote.estimatedTotal || 0,
    ],
  )
}

async function readDb() {
  const [admins] = await pool.query('SELECT email, password, name, role FROM admins ORDER BY id')
  const [quotes] = await pool.query('SELECT * FROM quotes ORDER BY created_at DESC, id DESC')
  const [prices] = await pool.query('SELECT platform_id, price FROM platform_prices')
  const [services] = await pool.query('SELECT name, price, enabled FROM services ORDER BY sort_order, id')
  const [rules] = await pool.query('SELECT min_platforms, discount_pct FROM discount_rules ORDER BY min_platforms')
  const [settings] = await pool.query('SELECT setting_key, setting_value FROM contact_settings')

  return {
    admins,
    quotes: quotes.map(mapQuote),
    platformPrices: Object.fromEntries(prices.map(row => [row.platform_id, Number(row.price)])),
    services: services.map(row => ({ name: row.name, price: row.price, enabled: Boolean(row.enabled) })),
    discountRules: rules.map(row => ({ minPlatforms: row.min_platforms, discountPct: Number(row.discount_pct) })),
    contactSettings: Object.fromEntries(settings.map(row => [row.setting_key, row.setting_value])),
  }
}

app.get('/api/health', async (_req, res, next) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
})

app.get('/api/db', async (_req, res, next) => {
  try {
    res.json(await readDb())
  } catch (error) {
    next(error)
  }
})

app.post('/api/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const [rows] = await pool.query('SELECT email, name, role FROM admins WHERE email = ? AND password = ? LIMIT 1', [email, password])
    if (!rows.length) return res.status(401).json({ error: 'Credenciales incorrectas' })
    res.json({ admin: rows[0] })
  } catch (error) {
    next(error)
  }
})

app.post('/api/quotes', async (req, res, next) => {
  try {
    await insertQuote(req.body)
    res.status(201).json({ quote: req.body })
  } catch (error) {
    next(error)
  }
})

app.put('/api/db', async (req, res, next) => {
  const db = req.body
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()
    await connection.query('DELETE FROM platform_prices')
    await connection.query('DELETE FROM services')
    await connection.query('DELETE FROM discount_rules')
    await connection.query('DELETE FROM contact_settings')
    for (const [platformId, price] of Object.entries(db.platformPrices || {})) {
      await connection.query('INSERT INTO platform_prices (platform_id, price) VALUES (?, ?)', [platformId, price])
    }
    for (const [index, service] of (db.services || []).entries()) {
      await connection.query('INSERT INTO services (name, price, enabled, sort_order) VALUES (?, ?, ?, ?)', [service.name, service.price, service.enabled, index])
    }
    for (const rule of db.discountRules || []) {
      await connection.query('INSERT INTO discount_rules (min_platforms, discount_pct) VALUES (?, ?)', [rule.minPlatforms, rule.discountPct])
    }
    for (const [key, value] of Object.entries(db.contactSettings || {})) {
      await connection.query('INSERT INTO contact_settings (setting_key, setting_value) VALUES (?, ?)', [key, value])
    }
    for (const quote of db.quotes || []) {
      await connection.query('UPDATE quotes SET status = ? WHERE id = ?', [quote.status, quote.id])
    }
    await connection.commit()
    res.json({ ok: true })
  } catch (error) {
    await connection.rollback()
    next(error)
  } finally {
    connection.release()
  }
})

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.get('*', (_req, res) => res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')))

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ error: 'Error interno del servidor' })
})

app.listen(port, () => {
  console.log(`VAELO API running on http://localhost:${port}`)
})

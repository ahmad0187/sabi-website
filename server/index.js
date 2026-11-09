import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import meRoutes from './routes/me.js';
import Product from './models/Product.js';
import { products } from './data/products.js';

const { MONGODB_URI, JWT_SECRET, PORT = 5000, CLIENT_URL = 'http://localhost:5173' } = process.env;
if (!MONGODB_URI || !JWT_SECRET) {
  console.error('Missing MONGODB_URI or JWT_SECRET. Copy server/.env.example to server/.env and fill it in.');
  process.exit(1);
}

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json({ limit: '50kb' }));
app.use(cookieParser());

app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 50, standardHeaders: true, legacyHeaders: false }), authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/me', meRoutes);
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// In production the built React app is served by this same server.
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => res.sendFile(path.join(dist, 'index.html'), (err) => err && next()));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

await mongoose.connect(MONGODB_URI);
console.log('MongoDB connected');
if ((await Product.countDocuments()) === 0) {
  await Product.insertMany(products.map(({ slug, ...rest }) => ({ slug, ...rest })));
  console.log(`Seeded ${products.length} products`);
}
app.listen(PORT, () => console.log(`Sabi API on http://localhost:${PORT}`));

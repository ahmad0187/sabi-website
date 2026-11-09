import 'dotenv/config';
import mongoose from 'mongoose';
import Product from './models/Product.js';
import { products } from './data/products.js';

await mongoose.connect(process.env.MONGODB_URI);
for (const p of products) {
  await Product.updateOne({ slug: p.slug }, { $set: p }, { upsert: true });
}
console.log(`Seeded ${products.length} products`);
await mongoose.disconnect();

import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

const shape = (p) => ({
  id: p.slug, brand: p.brand, title: p.title, gender: p.gender, family: p.family, notes: p.notes,
  description: p.description, pyramid: p.pyramid, shape: p.shape, liquid: p.liquid, cap: p.cap, bg: p.bg
});

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ order: 1 }).lean();
    res.json({ products: products.map(shape) });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const p = await Product.findOne({ slug: String(req.params.id) }).lean();
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json({ product: shape(p) });
  } catch (err) {
    next(err);
  }
});

export default router;

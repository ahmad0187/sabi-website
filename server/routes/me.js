import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);

const state = (u) => ({ cart: u.cart.map(({ id, size, qty }) => ({ id, size, qty })), wishlist: u.wishlist });

router.get('/state', (req, res) => res.json(state(req.user)));

// Replaces the signed-in user's saved bag and wishlist.
router.put('/state', async (req, res, next) => {
  try {
    const { cart, wishlist } = req.body;
    if (!Array.isArray(cart) || !Array.isArray(wishlist) || cart.length > 50 || wishlist.length > 200) {
      return res.status(400).json({ error: 'Invalid state' });
    }
    const cleanCart = cart.map((i) => ({
      id: String(i?.id ?? '').slice(0, 64),
      size: String(i?.size ?? '100 ml').slice(0, 16),
      qty: Math.min(99, Math.max(1, Math.floor(Number(i?.qty)) || 1))
    })).filter((i) => i.id);
    req.user.cart = cleanCart;
    req.user.wishlist = [...new Set(wishlist.map((w) => String(w).slice(0, 64)))];
    await req.user.save();
    res.json(state(req.user));
  } catch (err) {
    next(err);
  }
});

export default router;

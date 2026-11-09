import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from './AuthContext.jsx';

const ShopContext = createContext(null);
const STORAGE = 'sabi-shop';
const DEFAULT_SIZE = '100 ml';

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE));
    return { cart: Array.isArray(s?.cart) ? s.cart : [], wishlist: Array.isArray(s?.wishlist) ? s.wishlist : [] };
  } catch {
    return { cart: [], wishlist: [] };
  }
}

// Combine a guest bag with the saved one: same item keeps the larger quantity.
function mergeCarts(a, b) {
  const map = new Map();
  [...a, ...b].forEach((i) => {
    const key = `${i.id}|${i.size}`;
    const prev = map.get(key);
    map.set(key, prev ? { ...prev, qty: Math.max(prev.qty, i.qty) } : i);
  });
  return [...map.values()];
}

export function ShopProvider({ children }) {
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [{ cart, wishlist }, setShop] = useState(load);
  const syncedFor = useRef(null);

  useEffect(() => {
    api.get('/products')
      .then((d) => setProducts(d.products))
      .catch(() => setProducts([]))
      .finally(() => setProductsLoading(false));
  }, []);

  // Sign in: pull the saved bag and wishlist and merge with what the guest already added.
  // Sign out: clear the local copy so the next visitor on this device starts fresh.
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      if (syncedFor.current) setShop({ cart: [], wishlist: [] });
      syncedFor.current = null;
      return;
    }
    if (syncedFor.current === user.id) return;
    let cancelled = false;
    api.get('/me/state').then((server) => {
      if (cancelled) return;
      syncedFor.current = user.id;
      setShop((local) => ({
        cart: mergeCarts(server.cart, local.cart),
        wishlist: [...new Set([...server.wishlist, ...local.wishlist])]
      }));
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [user, authLoading]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE, JSON.stringify({ cart, wishlist })); } catch { /* storage unavailable */ }
    if (!user || syncedFor.current !== user.id) return;
    const t = setTimeout(() => { api.put('/me/state', { cart, wishlist }).catch(() => {}); }, 500);
    return () => clearTimeout(t);
  }, [cart, wishlist, user]);

  const byId = useMemo(() => Object.fromEntries(products.map((p) => [p.id, p])), [products]);

  const addToCart = useCallback((id, size = DEFAULT_SIZE, qty = 1) => {
    setShop((s) => {
      const hit = s.cart.find((i) => i.id === id && i.size === size);
      const next = hit
        ? s.cart.map((i) => (i === hit ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...s.cart, { id, size, qty }];
      return { ...s, cart: next };
    });
  }, []);

  const changeQty = useCallback((id, size, delta) => {
    setShop((s) => ({
      ...s,
      cart: s.cart.map((i) => (i.id === id && i.size === size ? { ...i, qty: Math.min(99, Math.max(1, i.qty + delta)) } : i))
    }));
  }, []);

  const removeFromCart = useCallback((id, size) => {
    setShop((s) => ({ ...s, cart: s.cart.filter((i) => !(i.id === id && i.size === size)) }));
  }, []);

  const toggleWish = useCallback((id) => {
    setShop((s) => ({
      ...s,
      wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id]
    }));
  }, []);

  const value = {
    products, byId, productsLoading,
    cart, wishlist,
    bagCount: cart.reduce((n, i) => n + i.qty, 0),
    wishCount: wishlist.length,
    addToCart, changeQty, removeFromCart, toggleWish
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => useContext(ShopContext);

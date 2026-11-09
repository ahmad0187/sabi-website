# Sabi — Perfume Website (MERN)

**Every Scent. Your Signature.**

MongoDB + Express + React + Node. The original static site is kept untouched in [`legacy/`](legacy/).

```
sabi-website/
├── client/   React (Vite) — all pages, bag, wishlist, login screens
├── server/   Express API — auth, products, saved bag and wishlist
└── legacy/   The previous static HTML/JS version
```

## Run it

1. **Connect MongoDB.** Copy `server/.env.example` to `server/.env` and fill in:
   - `MONGODB_URI` — your connection string (Atlas or local), ending in a database name such as `/sabi`
   - `JWT_SECRET` — a long random string (`node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
2. **Install:** `npm run install:all`
3. **Develop:** `npm run dev` — site on http://localhost:5173, API on http://localhost:5000

On first start the API seeds the 8 perfumes into your database (`npm run seed` re-syncs them).

### Production

`npm run build`, then `npm start`. Express serves the built React app and the API from one port (`PORT`, default 5000). Set `NODE_ENV=production` so the login cookie is `Secure` (needs HTTPS).

## Accounts

- **Create account / Sign in** at `/register` and `/login`; **My account** at `/account`.
- Passwords are hashed with bcrypt. The session is a signed JWT in an `httpOnly` cookie, so page scripts can't read it.
- Guests can browse and fill a bag (kept in the browser). On sign in, that bag and wishlist are merged with the saved ones and stored on the account, so they follow the user across devices.

## API

| Route | |
|---|---|
| `POST /api/auth/register` `{name,email,password}` | create account and sign in |
| `POST /api/auth/login` `{email,password}` | sign in |
| `POST /api/auth/logout` | sign out |
| `GET /api/auth/me` | current user |
| `GET /api/products`, `GET /api/products/:id` | catalogue |
| `GET/PUT /api/me/state` | saved bag and wishlist (signed in) |

## Common edits

- **Products:** edit `server/data/products.js`, then `npm run seed`.
- **Pages:** `client/src/pages/*.jsx`. Shared styles and animations: `client/src/styles.css`.
- **WhatsApp number:** `client/src/components/Chat.jsx` — change `https://wa.me/` to `https://wa.me/923XXXXXXXXX`.
- **Placeholders:** replace the `[PRICE]`, `[X–Y]` and other `[…]` markers in the pages.

## Not built yet

Checkout and orders (the bag's checkout button still links back to the bag), real prices, password reset, email verification.

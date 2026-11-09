# Sabi — Perfume Website

**Every Scent. Your Signature.**

A static website (HTML, CSS and JavaScript) with no build step and no framework. Open `index.html` in a browser, or upload the folder to any web host.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: hero, brands, scent families, bestsellers (filters, wishlist, add to bag), product of the month, story, quiz, discovery set, newsletter |
| `about.html` | About Us |
| `history.html` | Our History (since 2026) |
| `product.html` | Product Details: sizes, quantity, add to bag, wishlist, accordions, notes |
| `cart.html` | Shopping Cart: quantity, remove, delivery options, promo code, summary |
| `faq.html` | FAQs: topic filters and accordions |

Every page has the floating **WhatsApp** button and the **"Chat with us"** concierge chat.

## Folder structure

```
sabi-website/
├── index.html, about.html, history.html, product.html, cart.html, faq.html
└── assets/js/
    ├── sabi-runtime.js   ← tiny template engine (state, loops, events, scroll reveal)
    ├── components.js     ← realistic bottle drawing and chat/WhatsApp widget
    └── index.js, about.js, …  ← each page's data and behaviour
```

The page styles and animations sit in the `<style>` block in each page's `<head>`. Page markup sits inside `<template id="sabi-page">`.

## Common edits

- **Products, prices and notes:** edit the `all` list in `assets/js/index.js`, the cart items in `assets/js/cart.js` and the product text in `product.html`. Replace every `[PRICE]` and other `[…]` placeholder.
- **Real product photos:** swap a bottle tag such as
  `<dc-import name="Bottle" shape="round" liquid="#C8423A" …></dc-import>`
  for `<img src="images/your-photo.png" alt="Product name" style="width:100%;height:100%;object-fit:contain">`.
  Bottle shapes: `classic`, `round`, `tall`, `attar`. `liquid` and `cap` take any colour.
- **WhatsApp number:** in `assets/js/components.js`, change `https://wa.me/` to `https://wa.me/923XXXXXXXXX` (country code, no `+`).
- **Chat replies:** edit `this.replies` in the Chat section of `assets/js/components.js`. The replies are pre-written. To receive real messages, connect a live-chat service or an AI agent.
- **Accent colour:** search for `#9A5845`.

## Notes

- The cart and bag count are demos. They reset on each page until the site is connected to a real store (for example WooCommerce or Shopify) or to localStorage.
- Show third-party brand names (Dior, Chanel and so on) only if you sell genuine stock. They are trademarks of their owners.

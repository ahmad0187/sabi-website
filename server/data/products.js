// Catalogue seeded into MongoDB on first start (or with `npm run seed`).
const chunk = (notes) => {
  const n = notes.split(',').map((s) => s.trim());
  const size = Math.ceil(n.length / 3);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  return {
    top: cap(n.slice(0, size).join(', ')),
    heart: cap(n.slice(size, size * 2).join(', ') || n[n.length - 1]),
    base: cap(n.slice(size * 2).join(', ') || n[n.length - 1])
  };
};

const base = [
  { slug: 'sauvage', brand: 'Dior', title: 'Sauvage Eau de Parfum', gender: 'Men', family: 'Fresh spicy', notes: 'Bergamot, Sichuan pepper, ambroxan', shape: 'tall', liquid: '#2F4A6B', cap: '#1E1A1C', bg: '#E3E6EA' },
  { slug: 'coco', brand: 'Chanel', title: 'Coco Mademoiselle', gender: 'Women', family: 'Floral chypre', notes: 'Orange, rose, jasmine, patchouli', shape: 'classic', liquid: '#E9B48F', cap: '#C9A27A', bg: '#F4E3D8' },
  { slug: 'oudwood', brand: 'Tom Ford', title: 'Oud Wood', gender: 'Unisex', family: 'Oud', notes: 'Rare oud, sandalwood, vetiver, tonka', shape: 'classic', liquid: '#6A3E2A', cap: '#1E1A1C', bg: '#E6DCD3' },
  {
    slug: 'br540', brand: 'Maison Francis Kurkdjian', title: 'Baccarat Rouge 540', gender: 'Unisex', family: 'Amber floral', notes: 'Saffron, jasmine, amberwood, fir resin',
    shape: 'round', liquid: '#C8423A', cap: '#C9A27A', bg: '#F2DCD6',
    description: 'A luminous, airy amber. Glowing saffron and jasmine meet mineral amberwood and ambergris, finishing on a warm trail of fir resin and cedar.',
    pyramid: { top: 'Saffron, jasmine', heart: 'Amberwood, ambergris', base: 'Fir resin, cedar' }
  },
  { slug: 'libre', brand: 'Yves Saint Laurent', title: 'Libre Eau de Parfum', gender: 'Women', family: 'Floral', notes: 'Lavender, orange blossom, vanilla', shape: 'round', liquid: '#E8C46A', cap: '#C9A27A', bg: '#F4EADB' },
  { slug: 'aventus', brand: 'Creed', title: 'Aventus', gender: 'Men', family: 'Fruity chypre', notes: 'Pineapple, birch, blackcurrant, musk', shape: 'tall', liquid: '#3B4A3F', cap: '#B8B8BC', bg: '#E1E4DE' },
  { slug: 'lveb', brand: 'Lancôme', title: 'La Vie Est Belle', gender: 'Women', family: 'Gourmand', notes: 'Iris, praline, vanilla, patchouli', shape: 'round', liquid: '#E7A7B4', cap: '#EDE6E1', bg: '#F5E1DB' },
  { slug: 'khamrah', brand: 'Lattafa', title: 'Khamrah', gender: 'Unisex', family: 'Amber gourmand', notes: 'Cinnamon, dates, praline, tonka', shape: 'classic', liquid: '#8E3B2E', cap: '#C9A27A', bg: '#EBD6D4' }
];

export const products = base.map((p, i) => ({
  ...p,
  description: p.description || `A ${p.family.toLowerCase()} fragrance from ${p.brand}, built around ${p.notes.toLowerCase()}.`,
  pyramid: p.pyramid || chunk(p.notes),
  order: i
}));

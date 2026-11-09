import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  title: { type: String, required: true },
  gender: { type: String, enum: ['Men', 'Women', 'Unisex'], required: true },
  family: String,
  notes: String,
  description: String,
  pyramid: { top: String, heart: String, base: String },
  shape: { type: String, enum: ['classic', 'round', 'tall', 'attar'], default: 'classic' },
  liquid: String,
  cap: String,
  bg: String,
  order: { type: Number, default: 0 }
});

export default mongoose.model('Product', productSchema);

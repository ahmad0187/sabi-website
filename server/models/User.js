import mongoose from 'mongoose';

const cartItem = new mongoose.Schema(
  {
    id: { type: String, required: true },
    size: { type: String, default: '100 ml' },
    qty: { type: Number, required: true, min: 1, max: 99 }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    cart: { type: [cartItem], default: [] },
    wishlist: { type: [String], default: [] }
  },
  { timestamps: true }
);

userSchema.methods.toPublic = function () {
  return { id: this._id.toString(), name: this.name, email: this.email };
};

export default mongoose.model('User', userSchema);

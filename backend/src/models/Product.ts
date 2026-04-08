import mongoose, { Schema, Document } from 'mongoose';

export interface AuthorInfo {
  id: mongoose.Types.ObjectId;
  name: string;
  avatar: string;
}

export interface ProductEntity extends Document {
  seller: AuthorInfo;
  title: string;
  description: string;
  price: string;
  condition: "Nuevo" | "Usado";
  location: string;
  imagePath: string;
  tags: string[];
}

const ProductSchema = new Schema<ProductEntity>({
  seller: {
    id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  condition: { type: String, enum: ["Nuevo", "Usado"], required: true },
  location: { type: String, required: true },
  imagePath: { type: String, required: true },
  tags: { type: [String], default: [] }
}, {
  timestamps: true
});

export const ProductModel = mongoose.model<ProductEntity>("Product", ProductSchema);

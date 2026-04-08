import mongoose, { Schema, Document } from 'mongoose';

export interface UserEntity extends Document {
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: "Emprendedor" | "Usuario" | "Empresa" | "Independiente";
  bio?: string;
  location?: string;
  phone?: string;
  skills?: string[];
}

const UserSchema = new Schema<UserEntity>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://i.pravatar.cc/150?u=99" },
  role: { type: String, default: "Usuario" },
  bio: { type: String },
  location: { type: String },
  phone: { type: String },
  skills: { type: [String], default: [] }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<UserEntity>("User", UserSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface Author {
  name: string;
  avatar: string;
  role: string;
  time: string;
}

export interface PostEntity extends Document {
  type: "job" | "worker"; 
  author: Author;
  title: string;
  description: string;
  tags: string[];
  location: string;
  budget?: string;
  rate?: string;
  likes: number;
  comments: number;
}

const AuthorSchema = new Schema<Author>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, required: true },
  time: { type: String, required: true }
}, { _id: false });

const PostSchema = new Schema<PostEntity>({
  type: { type: String, enum: ["job", "worker"], required: true },
  author: { type: AuthorSchema, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], default: [] },
  location: { type: String, required: true },
  budget: { type: String },
  rate: { type: String },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 }
}, {
  timestamps: true
});

export const PostModel = mongoose.model<PostEntity>("Post", PostSchema);

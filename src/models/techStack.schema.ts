import { Schema, model, Document, Types } from 'mongoose';

export interface TechStackDocument extends Document {
  skillId: Types.ObjectId,
  userId: Types.ObjectId;

}

// SocialMedia Schema
const techStackSchema = new Schema<TechStackDocument>({
  skillId: { type: Schema.Types.ObjectId, ref: 'Skill' },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Define a compound index to enforce uniqueness of userId and skillId combination
techStackSchema.index({ userId: 1, skillId: 1 }, { unique: true });

export const TechStackSchema = model<TechStackDocument>('TechStackSchema', techStackSchema);
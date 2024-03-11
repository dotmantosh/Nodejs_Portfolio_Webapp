import { Schema, model, Document, Types } from 'mongoose';

export interface SocialMediaDocument extends Document {
  github: string;
  youtube: string;
  linkedIn: string;
  twitter: string;
  instagram: string;
  userId: Types.ObjectId;

}

// SocialMedia Schema
const socialMediaSchema = new Schema<SocialMediaDocument>({
  github: String,
  youtube: String,
  linkedIn: String,
  twitter: String,
  instagram: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const SocialMediaSchema = model<SocialMediaDocument>('SocialMedia', socialMediaSchema);
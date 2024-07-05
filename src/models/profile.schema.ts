import { Schema, model, Document, Types } from 'mongoose';

export interface ProfileDocument extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
  country: string;
  about: string;
  imageId: string;
  imageUrl: string;
  resumeId: string;
  resumeUrl: string;
  resumeName: string;
  twitter: string;
  github: string;
  discord: string;
  linkedIn: string;
  allowResumeDownload: boolean;
  allowPublicUrl: boolean;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

// Project Schema
const profileSchema = new Schema<ProfileDocument>({
  firstName: { type: String, trim: true, max: 50 },
  lastName: { type: String, trim: true, max: 50 },
  phoneNumber: { type: String, trim: true, max: 50 },
  state: { type: String, trim: true, max: 50 },
  country: { type: String, trim: true, max: 50 },
  allowResumeDownload: { type: Boolean, default: true },
  allowPublicUrl: { type: Boolean, default: true },
  about: String,
  twitter: String,
  github: String,
  discord: String,
  linkedIn: String,
  imageId: String,
  imageUrl: String,
  resumeId: String,
  resumeUrl: String,
  resumeName: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Create the unique index on the userId field
// User cannot create more than one profile
profileSchema.index({ userId: 1 }, { unique: true });

export const ProfileSchema = model<ProfileDocument>('Profile', profileSchema);

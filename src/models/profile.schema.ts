import { Schema, model, Document, Types } from 'mongoose';

interface ProfileDocument extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
  country: string;
  userId: Types.ObjectId;

}

// Project Schema
const profileSchema = new Schema<ProfileDocument>({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  state: String,
  country: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const ProfileSchema = model<ProfileDocument>('Project', profileSchema);

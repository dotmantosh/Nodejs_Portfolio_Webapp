import { Schema, model, Document, Types } from 'mongoose';

interface ProfileDocument extends Document {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  state: string;
  country: string;
  profilePicture: {photoId: string; photoUrl: string}
  userId: Types.ObjectId;

}

// Project Schema
const profileSchema = new Schema<ProfileDocument>({
  firstName: {type: String, require: true, trim: true, max: 50},
  lastName: {type: String, require: true, trim: true, max: 50},
  phoneNumber: String,
  state: {type: String, require: true, trim: true, max: 50},
  country: {type: String, require: true, trim: true, max: 50},
  profilePicture: {
    photoId: String,
    photoUrl:String
  },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const ProfileSchema = model<ProfileDocument>('Profile', profileSchema);

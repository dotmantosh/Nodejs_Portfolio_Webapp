import { Schema, model, Document, Types } from 'mongoose';

// Interface for User document
interface UserDocument extends Document {
  email: string;
  password: string;
  role: 'admin' | 'user';
  skills: Types.ObjectId[];
  workExperiences: Types.ObjectId[];
  projects: Types.ObjectId[];
  profile: Types.ObjectId;
}

// User Schema
const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  profile: { type: Schema.Types.ObjectId, ref: 'Profile' },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  workExperiences: [{ type: Schema.Types.ObjectId, ref: 'WorkExperience' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
});

export const User = model<UserDocument>('User', userSchema);

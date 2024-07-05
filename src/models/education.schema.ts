import { Schema, model, Document, Types } from 'mongoose';

export interface EducationDocument extends Document {
  school: string;
  qualification: string;
  programType: string;
  startDate: Date,
  endDate: Date,
  city: string,
  state: string,
  country: string,
  stillSchooling: boolean,
  userId: Types.ObjectId,
  createdAt: Date
  updatedAt: Date
}

// Education Schema
const educationSchema = new Schema<EducationDocument>({
  school: { type: String, required: true, trim: true },
  qualification: { type: String, required: true, trim: true, max: 50 },
  startDate: { type: Date, required: true },
  endDate: Date,
  city: String,
  state: String,
  country: String,
  programType: { type: String, default: "Full Time" },
  stillSchooling: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export const EducationSchema = model<EducationDocument>('Education', educationSchema);
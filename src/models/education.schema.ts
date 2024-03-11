import { Schema, model, Document, Types } from 'mongoose';

export interface EducationDocument extends Document {
  school: string;
  course: string;
  startDate: Date,
  endDate: Date,
  userId: Types.ObjectId;
}

// Education Schema
const educationSchema = new Schema<EducationDocument>({
  school: {type: String, require: true, trim: true},
  course: {type: String, require: true, trim: true, max: 50},
  startDate: {type: Date, require: true},
  endDate: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export const EducationSchema = model<EducationDocument>('Education', educationSchema);
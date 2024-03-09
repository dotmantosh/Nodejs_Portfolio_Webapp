import { Schema, model, Document, Types } from 'mongoose';

interface EducationDocument extends Document {
  school: string;
  course: string;
  startDate: Date,
  endDate: Date,
  userId: Types.ObjectId;
}

// Education Schema
const educationSchema = new Schema<EducationDocument>({
  school: String,
  course: String,
  startDate: Date,
  endDate: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

export const ProfileSchema = model<EducationDocument>('education', educationSchema);
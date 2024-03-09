import { Schema, model, Document, Types } from 'mongoose';

// Interface for WorkExperience document
interface WorkExperienceDocument extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  userId: Types.ObjectId;
  skills: Types.ObjectId[];
}

// WorkExperience Schema
const workExperienceSchema = new Schema<WorkExperienceDocument>({
  title: String,
  startDate: Date,
  endDate: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

export const WorkExperience = model<WorkExperienceDocument>('WorkExperience', workExperienceSchema);

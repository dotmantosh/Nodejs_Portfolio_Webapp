import { Schema, model, Document, Types } from 'mongoose';

// Interface for WorkExperience document
export interface WorkExperienceDocument extends Document {
  title: string;
  company: string;
  workType: string;
  employmentType: string;
  description: string;
  skills: Types.ObjectId[];
  startDate: Date;
  endDate: Date;
  stillWorkingHere: boolean;
  userId: Types.ObjectId;
}

// WorkExperience Schema
const workExperienceSchema = new Schema<WorkExperienceDocument>({
  title: String,
  company: String,
  workType: String,
  employmentType: String,
  startDate: Date,
  endDate: Date,
  stillWorkingHere: Boolean,
  description: String,
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

// Define a pre-save hook to enforce the maximum limit
const MAX_WORK_EXPERIENCE = 100; // Maximum number of skills allowed
workExperienceSchema.pre('save', async function (next) {
  const userId = this.userId
  const workExperienceCount = await this.model('WorkExperience').countDocuments({ userId });
  if (workExperienceCount >= MAX_WORK_EXPERIENCE) {
    throw new Error(`Maximum limit of ${MAX_WORK_EXPERIENCE} workExperience reached`);
  }
  next();
});

workExperienceSchema.virtual('populatedSkills', {
  ref: 'Skill', // Reference to Skill model
  localField: '_id', // Field in the WorkExperience schema
  foreignField: 'workExperienceId', // Field in the Skill schema
  justOne: false // Set to false if the 'skills' field is an array
});

workExperienceSchema.virtual('populatedProjects', {
  ref: 'Project', // Reference to Project model
  localField: '_id', // Field in the WorkExperience schema
  foreignField: 'workExperienceId', // Field in the Project schema
  justOne: false // Set to false if the 'projects' field is an array
});

export const WorkExperienceSchema = model<WorkExperienceDocument>('WorkExperience', workExperienceSchema);

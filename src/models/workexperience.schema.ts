import { Schema, model, Document, Types } from 'mongoose';

// Interface for WorkExperience document
interface WorkExperienceDocument extends Document {
  title: string;
  startDate: Date;
  endDate: Date;
  userId: Types.ObjectId;
  stacks: Types.ObjectId[];
}

// WorkExperience Schema
const workExperienceSchema = new Schema<WorkExperienceDocument>({
  title: String,
  startDate: Date,
  endDate: Date,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  stacks: [{ type: Schema.Types.ObjectId, ref: 'Skill' }]
});

// Define a pre-save hook to enforce the maximum limit
const MAX_WORK_EXPERIENCE = 100; // Maximum number of skills allowed
workExperienceSchema.pre('save', async function(next) {
  const userId = this.userId
  const workExperienceCount = await this.model('WorkExperience').countDocuments({userId});
  if (workExperienceCount >= MAX_WORK_EXPERIENCE) {
    throw new Error(`Maximum limit of ${MAX_WORK_EXPERIENCE} workExperience reached`);
  }
  next();
});

// workExperienceSchema.virtual('populatedSkills', {
//   ref: 'Skill', // Reference to Skill model
//   localField: 'skills', // Field in the WorkExperience schema
//   foreignField: '_id', // Field in the Skill schema
//   justOne: false // Set to false if the 'skills' field is an array
// });

export const WorkExperienceSchema = model<WorkExperienceDocument>('WorkExperience', workExperienceSchema);

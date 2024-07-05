import { Schema, model, Document, Types } from 'mongoose';

// Interface for Skill document
export interface SkillDocument extends Document {
  name: string;
  imageUrl: string;
  userId?: Types.ObjectId;
  createdAt?: Date
  updatedAt?: Date
}

// Skill Schema
const skillSchema = new Schema<SkillDocument>({
  name: String,
  imageUrl: String,
}, { timestamps: true });

// Define a pre-save hook to enforce the maximum limit
const MAX_SKILLS = 100; // Maximum number of skills allowed
skillSchema.pre('save', async function (next) {
  const skillsCount = await this.model('Skill').countDocuments();
  if (skillsCount >= MAX_SKILLS) {
    throw new Error(`Maximum limit of ${MAX_SKILLS} skills reached`);
  }
  next();
});

export const SkillSchema = model<SkillDocument>('Skill', skillSchema);

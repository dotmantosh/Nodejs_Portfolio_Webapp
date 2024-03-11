import { Schema, model, Document, Types } from 'mongoose';

// Interface for Skill document
interface SkillDocument extends Document {
  name: string;
  imageUrl: string;
  userId: Types.ObjectId
}

// Skill Schema
const skillSchema = new Schema<SkillDocument>({
  name: String,
  imageUrl: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Define a pre-save hook to enforce the maximum limit
const MAX_SKILLS = 100; // Maximum number of skills allowed
skillSchema.pre('save', async function(next) {
  const userId = this.userId
  const skillsCount = await this.model('Skill').countDocuments({userId});
  if (skillsCount >= MAX_SKILLS) {
    throw new Error(`Maximum limit of ${MAX_SKILLS} skills reached`);
  }
  next();
});

export const SkillSchema = model<SkillDocument>('Skill', skillSchema);

import { Schema, model, Document, Types } from 'mongoose';

// Interface for Skill document
interface SkillDocument extends Document {
  name: string;
  imageUrl: string;
}

// Skill Schema
const skillSchema = new Schema<SkillDocument>({
  name: String,
  imageUrl: String
});

export const Skill = model<SkillDocument>('Skill', skillSchema);

import { Schema, model, Document, Types } from 'mongoose';

interface ProjectDocument extends Document {
  name: string;
  description: string;
  userId: Types.ObjectId;
  skills: Types.ObjectId[];
  workExperienceId: Types.ObjectId;
}

// Project Schema
const projectsSchema = new Schema<ProjectDocument>({
  name: String,
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  workExperienceId: { type: Schema.Types.ObjectId, ref: 'WorkExperience' }
});

export const Projects = model<ProjectDocument>('Project', projectsSchema);

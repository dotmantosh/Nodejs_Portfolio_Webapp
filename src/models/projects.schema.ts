import { Schema, model, Document, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export enum ProjectTypeEnum {
  personalProject = "personal_project",
  contract = "contact",
  employee = "employee"
}
export interface ProjectDocument extends Document {
  name: string;
  description: string;
  // type: ProjectTypeEnum;
  startDate: Date;
  endDate: Date;
  imageUrl: string;
  imageId: string;
  livePreviewLink: string;
  githubRepo: string;
  skills: Types.ObjectId[];
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
}

// Project Schema
const projectsSchema = new Schema<ProjectDocument>({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  imageUrl: String,
  imageId: String,
  livePreviewLink: String,
  githubRepo: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // type: {type: String, enum: ["personal_project", "contract", "employee"]},
  // workExperienceId: { type: Schema.Types.ObjectId, ref: 'WorkExperience' }
});

projectsSchema.plugin(mongoosePaginate)

// Add a custom validator to ensure workExperienceId is only present when type is 'employee'
// projectsSchema.path('workExperienceId').validate(function(this: ProjectDocument, value: any) {
//   return this.type === ProjectTypeEnum.employee ? !!value : true;
// }, 'workExperience is only allowed when type is employee');


projectsSchema.virtual('populatedSkills', {
  ref: 'Skill', // Reference to Skill model
  localField: '_id', // Field in the project schema
  foreignField: 'projectId', // Field in the Skill schema
  justOne: false // Set to false if the 'skills' field is an array
});

export const ProjectSchema = model<ProjectDocument>('Project', projectsSchema);

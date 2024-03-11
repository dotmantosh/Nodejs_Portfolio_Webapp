import { Schema, model, Document, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2'

export enum ProjectTypeEnum {
  personalProject = "personal_project",
  contract = "contact",
  employee = "employee"
}
interface ProjectDocument extends Document {
  name: string;
  description: string;
  type: ProjectTypeEnum;
  userId: Types.ObjectId;
  stacks: Types.ObjectId[];
  workExperienceId?: Types.ObjectId;
}

// Project Schema
const projectsSchema = new Schema<ProjectDocument>({
  name: String,
  description: String,
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: {type: String, enum: ["personal_project", "contract", "employee"]},
  stacks: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
  workExperienceId: { type: Schema.Types.ObjectId, ref: 'WorkExperience' }
});

projectsSchema.plugin(mongoosePaginate)

// Add a custom validator to ensure workExperienceId is only present when type is 'employee'
projectsSchema.path('workExperienceId').validate(function(this: ProjectDocument, value: any) {
  return this.type === ProjectTypeEnum.employee ? !!value : true;
}, 'workExperience is only allowed when type is employee');


// projectsSchema.virtual('populatedSkills', {
//   ref: 'Skill', // Reference to Skill model
//   localField: 'skills', // Field in the WorkExperience schema
//   foreignField: '_id', // Field in the Skill schema
//   justOne: false // Set to false if the 'skills' field is an array
// });

export const ProjectSchema = model<ProjectDocument>('Project', projectsSchema);

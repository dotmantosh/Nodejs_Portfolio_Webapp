import { ProjectSchema, ProjectDocument } from './../models/projects.schema';

class ProjectService {

  static async createProject(project: ProjectDocument): Promise<ProjectDocument> {
    try {
      return await ProjectSchema.create(project);
    } catch (error) {
      throw new Error(`Error while creating Project: ${error}`);
    }
  }

  static async findAll(): Promise<ProjectDocument[]> {
    try {
      return await ProjectSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all Projects: ${error}`);
    }
  }

  static async findById(id: string): Promise<ProjectDocument | null> {
    try {
      return await ProjectSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }

  static async findByCondition(condition: {}): Promise<ProjectDocument[]> {
    try {
      return await ProjectSchema.find(condition);
    } catch (error) {
      throw new Error(`Error while finding all Projects: ${error}`);
    }
  }

  static async updateProject(id: string, project: Partial<ProjectDocument>): Promise<ProjectDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await ProjectSchema.findByIdAndUpdate(id, { $set: project }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating Project: ${error}`);
    }
  }

  static async deleteProject(id: string): Promise<ProjectDocument | null> {
    try {
      return await ProjectSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting Project: ${error}`);
    }
  }
}

export default ProjectService;
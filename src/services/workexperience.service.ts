import { WorkExperienceSchema, WorkExperienceDocument } from './../models/workexperience.schema';

class WorkExperienceService {

  static async createWorkExperience(workExperience: WorkExperienceDocument): Promise<WorkExperienceDocument> {
    try {
      return await WorkExperienceSchema.create(workExperience);
    } catch (error) {
      throw new Error(`Error while creating WorkExperience: ${error}`);
    }
  }

  static async findAll(): Promise<WorkExperienceDocument[]> {
    try {
      return await WorkExperienceSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all WorkExperiences: ${error}`);
    }
  }

  static async findById(id: string): Promise<WorkExperienceDocument | null> {
    try {
      return await WorkExperienceSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding WorkExperience by id: ${error}`);
    }
  }

  static async findOne(condition: object): Promise<WorkExperienceDocument | null> {
    try {
      return await WorkExperienceSchema.findOne(condition);
    } catch (error) {
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }

  static async findByCondition(condition: object) {
    try {
      const workExperiences = await WorkExperienceSchema.find(condition)
        .populate({
          path: 'populatedSkills',
          model: 'Skill',
          options: { virtuals: true }
        })
        .sort({ createdAt: -1 });
      return workExperiences;
    } catch (error) {
      throw new Error(`Error while finding all WorkExperiences: ${error}`);
    }

  }


  static async updateWorkExperience(id: string, workExperience: Partial<WorkExperienceDocument>): Promise<WorkExperienceDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await WorkExperienceSchema.findByIdAndUpdate(id, { $set: workExperience }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating WorkExperience: ${error}`);
    }
  }

  static async deleteWorkExperience(id: string): Promise<WorkExperienceDocument | null> {
    try {
      return await WorkExperienceSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting WorkExperience: ${error}`);
    }
  }
}

export default WorkExperienceService;
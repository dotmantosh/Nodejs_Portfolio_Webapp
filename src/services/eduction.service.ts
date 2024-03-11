import { EducationSchema, EducationDocument } from './../models/education.schema';

class EducationService {

  static async createEducation(education: EducationDocument): Promise<EducationDocument> {
    try {
      return await EducationSchema.create(education);
    } catch (error) {
      throw new Error(`Error while creating education: ${error}`);
    }
  }

  static async findAll(): Promise<EducationDocument[]> {
    try {
      return await EducationSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all Educations: ${error}`);
    }
  }

  static async findById(id: string): Promise<EducationDocument | null> {
    try {
      return await EducationSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding Education by id: ${error}`);
    }
  }

  static async findByCondition(condition: {}): Promise<EducationDocument[]> {
    try {
      return await EducationSchema.find(condition);
    } catch (error) {
      throw new Error(`Error while finding all Educations: ${error}`);
    }
  }

  static async updateEducation(id: string, education: Partial<EducationDocument>): Promise<EducationDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await EducationSchema.findByIdAndUpdate(id, { $set: education }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating Education: ${error}`);
    }
  }

  static async deleteEducation(id: string): Promise<EducationDocument | null> {
    try {
      return await EducationSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting Education: ${error}`);
    }
  }
}

export default EducationService;
import { ProfileSchema, ProfileDocument } from './../models/profile.schema';

class ProfileService {

  static async createProfile(profile: ProfileDocument): Promise<ProfileDocument> {
    try {
      return await ProfileSchema.create(profile);
    } catch (error) {
      throw new Error(`Error while creating profile: ${error}`);
    }
  }

  static async findAll(): Promise<ProfileDocument[]> {
    try {
      return await ProfileSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all profiles: ${error}`);
    }
  }

  static async findById(id: string): Promise<ProfileDocument | null> {
    try {
      return await ProfileSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding profile by id: ${error}`);
    }
  }

  static async findByCondition(condition: {}): Promise<ProfileDocument[]> {
    try {
      return await ProfileSchema.find(condition);
    } catch (error) {
      throw new Error(`Error while finding all profiles: ${error}`);
    }
  }

  static async updateProfile(id: string, profile: Partial<ProfileDocument>): Promise<ProfileDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await ProfileSchema.findByIdAndUpdate(id, { $set: profile }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating profile: ${error}`);
    }
  }

  static async deleteProfile(id: string): Promise<ProfileDocument | null> {
    try {
      return await ProfileSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting profile: ${error}`);
    }
  }
}

export default ProfileService;
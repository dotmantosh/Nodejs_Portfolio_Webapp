import { SocialMediaSchema, SocialMediaDocument } from './../models/socialmedia.schema';

class SocialMediaService {

  static async createSocialMedia(socialMedia: SocialMediaDocument): Promise<SocialMediaDocument> {
    try {
      return await SocialMediaSchema.create(socialMedia);
    } catch (error) {
      throw new Error(`Error while creating SocialMedia: ${error}`);
    }
  }

  static async findAll(): Promise<SocialMediaDocument[]> {
    try {
      return await SocialMediaSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all SocialMedias: ${error}`);
    }
  }

  static async findById(id: string): Promise<SocialMediaDocument | null> {
    try {
      return await SocialMediaSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding SocialMedia by id: ${error}`);
    }
  }

  static async findByCondition(condition: {}): Promise<SocialMediaDocument[]> {
    try {
      return await SocialMediaSchema.find(condition);
    } catch (error) {
      throw new Error(`Error while finding all SocialMedias: ${error}`);
    }
  }

  static async updateSocialMedia(id: string, socialMedia: Partial<SocialMediaDocument>): Promise<SocialMediaDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await SocialMediaSchema.findByIdAndUpdate(id, { $set: socialMedia }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating SocialMedia: ${error}`);
    }
  }

  static async deleteSocialMedia(id: string): Promise<SocialMediaDocument | null> {
    try {
      return await SocialMediaSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting SocialMedia: ${error}`);
    }
  }
}

export default SocialMediaService;
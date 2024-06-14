import { ProfileSchema, ProfileDocument } from './../models/profile.schema';
import UserService from './user.service';

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
      return await ProfileSchema.find({});
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
  static async findOne(condition: object): Promise<ProfileDocument | null> {
    try {
      return await ProfileSchema.findOne(condition);
    } catch (error) {
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }
  static async findByUsername(username: string): Promise<ProfileDocument | null> {
    try {
      const user = await UserService.findByUserName(username)
      const project = this.findOneAndPopulate({ userId: user._id })
      return project
    } catch (error) {
      throw new Error(`Error fetching Project`)
    }
  }
  static async findOneAndPopulate(condition: object): Promise<ProfileDocument | null> {
    try {
      const pipeline = [
        {
          $match: condition // Assuming you have user authentication and have access to req.user._id
        },
        {
          $lookup: {
            from: 'skills',
            localField: 'skills',
            foreignField: '_id',
            as: 'populatedSkills'
          }
        },
        {
          $project: {
            firstName: 1,
            lastName: 1,
            phoneNumber: 1,
            state: 1,
            country: 1,
            about: 1,
            imageUrl: 1,
            imageId: 1,
            twitter: 1,
            github: 1,
            discord: 1,
            linkedIn: 1,
            resumeId: 1,
            resumeUrl: 1,
            resumeName: 1,
            allowResumeDownload: 1,
            allowPublicUrl: 1,
            userId: 1,
            populatedSkills: {
              _id: 1,
              name: 1,
              imageUrl: 1
            }
          }
        },
        {
          $limit: 1 // Limit the result to only one document
        }
      ];
      const result = await ProfileSchema.aggregate(pipeline)

      // Return the first document in the result array or null if the array is empty
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw new Error(`Error while finding one Project and populating skills: ${error}`);
    }
  }

  static async findByCondition(condition: object): Promise<ProfileDocument[]> {
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
import { ProjectSchema, ProjectDocument } from './../models/projects.schema';
import UserService from './user.service';

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
      return await ProjectSchema.findById(id).populate('skills');
    } catch (error) {
      console.log(error)
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }
  static async findOne(condition: object): Promise<ProjectDocument | null> {
    try {
      return await ProjectSchema.findOne(condition);
    } catch (error) {
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }

  static async findOneAndPopulate(condition: object): Promise<ProjectDocument | null> {
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
            name: 1,
            description: 1,
            workType: 1,
            startDate: 1,
            endDate: 1,
            livePreviewLink: 1,
            githubRepo: 1,
            imageUrl: 1,
            imageId: 1,
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

      const result = await ProjectSchema.aggregate(pipeline);

      // Return the first document in the result array or null if the array is empty
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      throw new Error(`Error while finding one Project and populating skills: ${error}`);
    }
  }

  static async findByCondition(condition: object): Promise<ProjectDocument[]> {
    try {
      // return await ProjectSchema.find(condition);
      return await ProjectSchema.aggregate([
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
            name: 1,
            description: 1,
            workType: 1,
            startDate: 1,
            endDate: 1,
            livePreviewLink: 1,
            githubRepo: 1,
            imageUrl: 1,
            imageId: 1,
            userId: 1,
            populatedSkills: {
              _id: 1,
              name: 1,
              imageUrl: 1
            }
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error while finding all Projects: ${error}`);
    }
  }

  static async findByUsername(username: string): Promise<ProjectDocument[]> {
    try {
      const user = await UserService.findByUserName(username)
      const project = await ProjectSchema.aggregate([
        {
          $match: { userId: user._id }
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
            name: 1,
            description: 1,
            workType: 1,
            startDate: 1,
            endDate: 1,
            livePreviewLink: 1,
            githubRepo: 1,
            imageUrl: 1,
            imageId: 1,
            userId: 1,
            populatedSkills: {
              _id: 1,
              name: 1,
              imageUrl: 1
            }
          }
        }
      ]);
      return project
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
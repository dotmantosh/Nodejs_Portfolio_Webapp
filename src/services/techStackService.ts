import { TechStackSchema, TechStackDocument } from './../models/techStack.schema';

class TechStackService {

  static async createTechStack(techStack: TechStackDocument): Promise<TechStackDocument> {
    try {
      return await TechStackSchema.create(techStack);
    } catch (error) {
      throw new Error(`Error while creating techStack: ${error}`);
    }
  }

  static async findAll(): Promise<TechStackDocument[]> {
    try {
      return await TechStackSchema.find();
    } catch (error) {
      throw new Error(`Error while finding all TechStacks: ${error}`);
    }
  }

  static async findById(id: string): Promise<TechStackDocument | null> {
    try {
      return await TechStackSchema.findById(id);
    } catch (error) {
      throw new Error(`Error while finding techStack by id: ${error}`);
    }
  }

  static async findOne(condition: object): Promise<TechStackDocument | null> {
    try {
      return await TechStackSchema.findOne(condition);
    } catch (error) {
      throw new Error(`Error while finding Project by id: ${error}`);
    }
  }

  static async findByCondition(condition: object): Promise<TechStackDocument[]> {
    try {
      // return await ProjectSchema.find(condition);
      return await TechStackSchema.aggregate([
        {
          $match: condition // Assuming you have user authentication and have access to req.user._id
        },
        {
          $lookup: {
            from: 'skills',
            localField: 'skillId',
            foreignField: '_id',
            as: 'populatedSkill'
          }
        },
        {
          $unwind: '$populatedSkill'
        },
        {
          $project: {
            userId: 1,
            skillId: 1,
            populatedSkill: '$populatedSkill'
          }
        }
      ]);
    } catch (error) {
      throw new Error(`Error while finding all Projects: ${error}`);
    }
  }


  static async updateTechStack(id: string, techStack: Partial<TechStackDocument>): Promise<TechStackDocument | null> {
    try {
      // Using 'set' option to preserve fields that are not present in the payload
      return await TechStackSchema.findByIdAndUpdate(id, { $set: techStack }, { new: true });
    } catch (error) {
      throw new Error(`Error while updating techStack: ${error}`);
    }
  }

  static async deleteTechStack(id: string): Promise<TechStackDocument | null> {
    try {
      return await TechStackSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`Error while deleting techStack: ${error}`);
    }
  }
}

export default TechStackService;
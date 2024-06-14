import { Request, Response, NextFunction } from "express";
import SkillService from "../services/skill.service";
import { UserDocument } from "../models/user.schema";
import fs from 'fs'
// import { SkillDocument } from "../models/skill.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class SkillController {
    static async createSkill(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const skill = await SkillService.createSkill(req.body);
            res.json(skill);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateSkillsFromJsonFile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Read the skills JSON file
            const skillsData = fs.readFileSync('skills.json', 'utf-8');

            // Parse the JSON data
            const skills = JSON.parse(skillsData);

            // Iterate over the skills and update the database
            for (const skill of skills) {
                // Update the skill in the database with the new URL
                await SkillService.updateSkill(skill._id, { imageUrl: skill.imageUrl });
            }
            res.send({ message: "ImageUrl, updated successfully" })
            console.log('Skills have been updated from skills.json');
        } catch (error) {
            console.error('Error updating skills from skills.json:', error);
            next(error)
        }
    }

    static async fetchAllSkills(req: Request, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user

            const skills = await SkillService.findAll();
            res.json(skills);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserSkill(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const skill = await SkillService.findById(user._id);
            if (!skill) {
                return res.status(404).json({ message: "Skill not found" });
            }
            res.json(skill);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateSkill(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const updatedSkill = await SkillService.updateSkill(req.params.id, req.body);
            if (!updatedSkill) {
                return res.status(404).json({ message: "Skill not found" });
            }
            res.json(updatedSkill);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteSkill(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const deletedSkill = await SkillService.deleteSkill(req.params.id);
            if (!deletedSkill) {
                return res.status(404).json({ message: "Skill not found" });
            }
            res.json({ message: "Skill deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default SkillController;
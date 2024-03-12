import { Request, Response, NextFunction } from "express";
import SkillService from "../services/skill.service";
import { UserDocument } from "../models/user.schema";
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

    static async fetchUserSkill(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
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
import { Request, Response, NextFunction } from "express";
import WorkExperienceService from "../services/workexperience.service";
import { WorkExperienceDocument } from "../models/workexperience.schema";
import { UserDocument } from "../models/user.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class WorkExperienceController {
    static async createWorkExperience(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const workExperience = await WorkExperienceService.createWorkExperience(req.body);
            res.json(workExperience);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserWorkExperience(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const workExperience = await WorkExperienceService.findById(user._id);
            if (!workExperience) {
                return res.status(404).json({ message: "WorkExperience not found" });
            }
            res.json(workExperience);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateWorkExperience(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const updatedWorkExperience = await WorkExperienceService.updateWorkExperience(req.params.id, req.body);
            if (!updatedWorkExperience) {
                return res.status(404).json({ message: "WorkExperience not found" });
            }
            res.json(updatedWorkExperience);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteWorkExperience(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const deletedWorkExperience = await WorkExperienceService.deleteWorkExperience(req.params.id);
            if (!deletedWorkExperience) {
                return res.status(404).json({ message: "WorkExperience not found" });
            }
            res.json({ message: "WorkExperience deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default WorkExperienceController;
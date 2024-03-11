import { Request, Response, NextFunction } from "express";
import EducationService from "../services/eduction.service";
import { EducationDocument } from "../models/education.schema";

class EducationController {
    static async createEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const education = await EducationService.createEducation(req.body);
            res.json(education);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserEducation(req: Request, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const education = await EducationService.findById(user._id);
            if (!education) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json(education);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedEducation = await EducationService.updateEducation(req.params.id, req.body);
            if (!updatedEducation) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json(updatedEducation);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteEducation(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedEducation = await EducationService.deleteEducation(req.params.id);
            if (!deletedEducation) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json({ message: "Education deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default EducationController;
import { Request, Response, NextFunction } from "express";
import EducationService from "../services/eduction.service";
// import { EducationDocument } from "../models/education.schema";
import { UserDocument } from "../models/user.schema";
import UserService from "../services/user.service";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}
class EducationController {
    static async createEducation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            req.body.userId = user._id
            const education = await EducationService.createEducation(req.body);
            res.json(education);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserEducation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;

            const education = (await EducationService.findByCondition({ userId: user._id })).sort((a, b) => a.get('createdAt').localeCompare(b.get('createdAt')));
            if (!education) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json(education);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchByUsername(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = await UserService.findByUserName(req.params.username)

            const education = (await EducationService.findByCondition({ userId: user._id })).sort((a, b) => a.get('createdAt').localeCompare(b.get('createdAt')));
            if (!education) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json(education);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateEducation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const existingEducation = await EducationService.findOne({ _id: req.params.id, userId: user._id })
            if (!existingEducation) {
                return res.status(404).json({ message: "Education not found" })
            }
            const updatedEducation = await EducationService.updateEducation(req.params.id, req.body);
            if (!updatedEducation) {
                return res.status(404).json({ message: "Education not found" });
            }
            res.json(updatedEducation);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteEducation(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const existingEducation = await EducationService.findOne({ _id: req.params.id, userId: user._id })
            if (!existingEducation) {
                return res.status(404).json({ message: "Education not found" })
            }
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
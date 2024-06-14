import { UserDocument } from './../models/user.schema';
import { Request, Response, NextFunction } from "express";
import SocialMediaService from "../services/socialmedia.service";
// import { UserDocument } from "../models/user.schema";
// import { SocialMediaDocument } from "../models/socialMedia.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class SocialMediaController {
    static async createSocialMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.UserDocument
            req.body.userId = user._id
            const socialMedia = await SocialMediaService.createSocialMedia(req.body);
            res.json(socialMedia);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserSocialMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const socialMedia = await SocialMediaService.findById(user._id);
            if (!socialMedia) {
                return res.status(404).json({ message: "SocialMedia not found" });
            }
            res.json(socialMedia);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateSocialMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingSocialMedia = await SocialMediaService.findOne({ _id: id, userId: user._id })
            if (!existingSocialMedia) {
                return res.status(404).json({ message: "SocialMedia not found" })
            }

            const updatedSocialMedia = await SocialMediaService.updateSocialMedia(req.params.id, req.body);
            if (!updatedSocialMedia) {
                return res.status(404).json({ message: "SocialMedia not found" });
            }
            res.json(updatedSocialMedia);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteSocialMedia(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingProject = await SocialMediaService.findOne({ _id: id, userId: user._id })
            if (!existingProject) {
                return res.status(404).json({ message: "Project not found" })
            }
            const deletedSocialMedia = await SocialMediaService.deleteSocialMedia(req.params.id);
            if (!deletedSocialMedia) {
                return res.status(404).json({ message: "SocialMedia not found" });
            }
            res.json({ message: "SocialMedia deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default SocialMediaController;
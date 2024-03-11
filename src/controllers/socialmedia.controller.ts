import { Request, Response, NextFunction } from "express";
import SocialMediaService from "../services/socialmedia.service";
// import { SocialMediaDocument } from "../models/socialMedia.schema";

class SocialMediaController {
    static async createSocialMedia(req: Request, res: Response, next: NextFunction) {
        try {
            const socialMedia = await SocialMediaService.createSocialMedia(req.body);
            res.json(socialMedia);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserSocialMedia(req: Request, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
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

    static async updateSocialMedia(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedSocialMedia = await SocialMediaService.updateSocialMedia(req.params.id, req.body);
            if (!updatedSocialMedia) {
                return res.status(404).json({ message: "SocialMedia not found" });
            }
            res.json(updatedSocialMedia);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteSocialMedia(req: Request, res: Response, next: NextFunction) {
        try {
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
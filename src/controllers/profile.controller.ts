import { Request, Response, NextFunction } from "express";
import ProfileService from "../services/profile.service";
import { ProfileDocument } from "../models/profile.schema";

class ProfileController {
    static async createProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const profile = await ProfileService.createProfile(req.body);
            res.json(profile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserProfile(req: Request, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const profile = await ProfileService.findById(user._id);
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.json(profile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const updatedProfile = await ProfileService.updateProfile(req.params.id, req.body);
            if (!updatedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.json(updatedProfile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const deletedProfile = await ProfileService.deleteProfile(req.params.id);
            if (!deletedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.json({ message: "Profile deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default ProfileController;
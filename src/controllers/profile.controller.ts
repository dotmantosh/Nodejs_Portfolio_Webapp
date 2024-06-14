import { Request, Response, NextFunction } from "express";
import ProfileService from "../services/profile.service";
// import { ProfileDocument } from "../models/profile.schema";
import { UserDocument } from "../models/user.schema";
import { uploadImage, deleteImage, UploadPreset, uploadPDF, deletePDF } from "../services/cloudinary.service";
import UserService from "../services/user.service";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class ProfileController {
    static async createProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            if (req.body.photo) {
                const uploadResponse = await uploadImage(req.body.photo, UploadPreset.ProfilePicture);
                req.body.imageId = uploadResponse.public_id
                req.body.imageUrl = uploadResponse.secure_url
            }
            if (req.body.resume) {
                const uploadResponse = await uploadPDF(req.body.resume, UploadPreset.ResumePDF);
                req.body.resumeId = uploadResponse.public_id
                req.body.resumeUrl = uploadResponse.secure_url
            }
            req.body.userId = user._id;
            const profile = await ProfileService.createProfile(req.body);
            res.json(profile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchAllProfiles(req: Request, res: Response, next: NextFunction) {
        try {
            const profiles = await ProfileService.findAll()
            res.json(profiles)

        } catch (error) {
            next(error)
        }
    }

    static async fetchByUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.findByUserName(req.params.username)
            const profile = await ProfileService.findOneAndPopulate({ userId: user._id });
            if (!profile) {
                return res.status(404).send({ error: "Profile not found" })
            }
            res.json(profile)
        } catch (error) {
            next(error)
        }
    }

    static async fetchUserProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;

            const profile = await ProfileService.findOneAndPopulate({ userId: user._id });
            if (!profile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.json(profile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const id = req.params.id
            // console.log(req.body)
            const existingProfile = await ProfileService.findOne({ _id: id, userId: user._id })
            if (!existingProfile) {
                return res.status(404).json({ message: "Profile not found" })
            }
            if (req.body.photo?.length) {
                if (existingProfile.imageId) await deleteImage(existingProfile?.imageId as string)
                // if(user.imageId) await deleteImage(user.imageId as string)


                const { public_id, secure_url } = await uploadImage(req.body.photo, UploadPreset.ProfilePicture)
                req.body.imageId = public_id
                req.body.imageUrl = secure_url
                await UserService.updateUserProfilePicture(user._id, { imageId: public_id, imageUrl: secure_url } as UserDocument)
            }
            if (req.body.resume?.length) {
                if (existingProfile.resumeId) await deleteImage(existingProfile?.resumeId as string)
                // if(user.imageId) await deleteImage(user.imageId as string)


                const { public_id, secure_url } = await uploadPDF(req.body.resume, UploadPreset.ResumePDF)
                req.body.resumeId = public_id
                req.body.resumeUrl = secure_url
            }
            const updatedProfile = await ProfileService.updateProfile(req.params.id, req.body);
            if (!updatedProfile) {
                return res.status(404).json({ message: "Profile not found" });
            }
            res.json(updatedProfile);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteResume(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingProfile = await ProfileService.findOne({ _id: id, userId: user._id })
            if (!existingProfile) {
                res.status(404).send({ error: "profile not found" })
                return
            }
            await deletePDF(existingProfile?.resumeId as string)
            existingProfile.resumeId = ""
            existingProfile.resumeUrl = ""
            existingProfile.save()
            res.json(existingProfile)
        } catch (error) {
            next(error)
        }
    }

    static async deleteProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingProfile = await ProfileService.findOne({ _id: id, userId: user._id })
            if (!existingProfile) {
                return res.status(404).json({ message: "Profile not found" })
            }
            if (existingProfile.imageId) await deleteImage(existingProfile?.imageId as string)
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
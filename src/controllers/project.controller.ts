import { Request, Response, NextFunction } from "express";
import ProjectService from "../services/project.service";
import { UserDocument } from "../models/user.schema";
import { uploadImage, deleteImage, UploadPreset } from '../services/cloudinary.service'
// import {UploadApiResponse} from 'cloudinary'
// import { ProjectDocument } from "../models/project.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class ProJectController {
    static async createProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            req.body.userId = user._id

            if (req.body.photo) {
                const uploadResponse = await uploadImage(req.body.photo, UploadPreset.ProjectPicture)
                req.body.imageId = uploadResponse.public_id
                req.body.imageUrl = uploadResponse.secure_url
            }
            const project = await ProjectService.createProject(req.body);
            res.json(project);
        } catch (error) {
            console.log(error)
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;
            const project = await ProjectService.findByCondition({ userId: user._id });
            res.json(project);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
    static async fetchProjectById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            console.log(req.params.id)
            const project = await ProjectService.findById(req.params.id)
            if (!project) {
                return res.status(404).send({ error: "Project with the project Id was not found" })
            }
            res.json(project);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchProjectsByUsername(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const projects = await ProjectService.findByUsername(req.params.username);

            res.json(projects);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user;
            const id = req.params.id
            const existingProject = await ProjectService.findOne({ _id: id, userId: user._id })
            if (!existingProject) {
                return res.status(404).json({ message: "Project not found" })
            }
            if (req.body?.photo?.length) {
                if (existingProject.imageId) await deleteImage(existingProject?.imageId as string)

                const { public_id, secure_url } = await uploadImage(req.body.photo, UploadPreset.ProjectPicture)
                req.body.imageId = public_id
                req.body.imageUrl = secure_url
            }

            const updatedProject = await ProjectService.updateProject(req.params.id, req.body);
            if (!updatedProject) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json(updatedProject);
        } catch (error) {
            console.log(error)
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingProject = await ProjectService.findOne({ _id: id, userId: user._id })
            if (!existingProject) {
                return res.status(404).json({ message: "Project not found" })
            }
            if (existingProject.imageId) await deleteImage(existingProject?.imageId as string)
            const deletedProject = await ProjectService.deleteProject(req.params.id);
            if (!deletedProject) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json({ message: "Project deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default ProJectController;
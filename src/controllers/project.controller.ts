import { Request, Response, NextFunction } from "express";
import ProjectService from "../services/project.service";
import { UserDocument } from "../models/user.schema";
// import { ProjectDocument } from "../models/project.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class ProJectController {
    static async createProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const project = await ProjectService.createProject(req.body);
            res.json(project);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in req.user
            const user = req.user;
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const project = await ProjectService.findById(user._id);
            if (!project) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json(project);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const updatedProject = await ProjectService.updateProject(req.params.id, req.body);
            if (!updatedProject) {
                return res.status(404).json({ message: "Project not found" });
            }
            res.json(updatedProject);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
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
import { Request, Response, NextFunction } from "express";
import TechStackService from "../services/techStackService";
import { UserDocument } from "../models/user.schema";
import { TechStackDocument } from "../models/techStack.schema";
import UserService from "../services/user.service";
// import { TechStackDocument } from "../models/techStack.schema";

// Extend the existing Request interface to include the user property
interface AuthenticatedRequest extends Request {
    user?: UserDocument; // Assuming UserDocument is the type of your user model
}

class TechStackController {
    static async createTechStack(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const data = { userId: user._id, skillId: req.body._id }

            const techStack = await TechStackService.createTechStack(data as TechStackDocument);
            res.json(techStack);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchUserTechStack(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = res.locals.user;

            // const techStack = await TechStackService.findAll();
            const techStack = await TechStackService.findByCondition({ userId: user._id });
            // console.log(techStack)
            res.json(techStack);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async fetchTechStackByUsername(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            // Assuming the authenticated user object is stored in res.locals.user
            const user = await UserService.findByUserName(req.params.username)

            // const techStack = await TechStackService.findAll();
            const techStack = await TechStackService.findByCondition({ userId: user._id });
            // console.log(techStack)
            res.json(techStack);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async updateTechStack(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingTechStack = await TechStackService.findOne({ _id: id, userId: user._id })
            if (!existingTechStack) {
                return res.status(404).json({ message: "TechStack not found" })
            }
            const updatedTechStack = await TechStackService.updateTechStack(req.params.id, req.body);
            if (!updatedTechStack) {
                return res.status(404).json({ message: "TechStack not found" });
            }
            res.json(updatedTechStack);
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }

    static async deleteTechStack(req: AuthenticatedRequest, res: Response, next: NextFunction) {
        try {
            const user = res.locals.user
            const id = req.params.id
            const existingTechStack = await TechStackService.findOne({ _id: id, userId: user._id })
            if (!existingTechStack) {
                return res.status(404).json({ message: "TechStack not found" })
            }
            await TechStackService.deleteTechStack(req.params.id);

            res.json({ message: "TechStack deleted successfully" });
        } catch (error) {
            next(error); // Pass error to the error handling middleware
        }
    }
}

export default TechStackController;
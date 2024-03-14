import express from "express";
import ProjectController from '../controllers/project.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, ProjectController.fetchUserProject);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, ProjectController.fetchUserProject);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, ProjectController.fetchUserProject);
router.post<{}, MessageResponse>("/create", isAuthenticated, ProjectController.createProject);
router.put<{}, MessageResponse>("/update/:id", isAuthenticated, ProjectController.updateProject);
router.delete<{}, MessageResponse>("/delete/:id", isAuthenticated, ProjectController.deleteProject);


export default router;
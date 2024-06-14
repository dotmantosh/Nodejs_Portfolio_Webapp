import express from "express";
import ProjectController from '../controllers/project.controller'
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get("/fetch", isAuthenticated, ProjectController.fetchUserProject);
router.get("/user/fetch", isAuthenticated, ProjectController.fetchUserProject);
router.get("/fetch/:username", ProjectController.fetchProjectsByUsername);
router.get("/public/fetch/:id", ProjectController.fetchProjectById)
router.post("/create", isAuthenticated, ProjectController.createProject);
router.put("/update/:id", isAuthenticated, ProjectController.updateProject);
router.delete("/delete/:id", isAuthenticated, ProjectController.deleteProject);


export default router;
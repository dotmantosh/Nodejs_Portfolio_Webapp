import express from "express";
import ProjectController from '../controllers/project.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", ProjectController.fetchUserProject);
router.get < {},MessageResponse >("/user/fetch", ProjectController.fetchUserProject);
router.get < {},MessageResponse >("/fetch/:id", ProjectController.fetchUserProject);
router.post < {},MessageResponse >("/create", ProjectController.createProject);
router.put < {},MessageResponse >("/update", ProjectController.updateProject);
router.delete < {},MessageResponse >("/delete", ProjectController.deleteProject);


export default router;
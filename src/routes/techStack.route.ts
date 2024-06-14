import express from "express";
import TechStackController from '../controllers/techStack.controller'
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get("/fetch", isAuthenticated, TechStackController.fetchUserTechStack);
router.get("/user/fetch", isAuthenticated, TechStackController.fetchUserTechStack);
router.get("/fetch/:username", TechStackController.fetchTechStackByUsername);
router.post("/create", isAuthenticated, TechStackController.createTechStack);
router.put("/update/:id", isAuthenticated, TechStackController.updateTechStack);
router.delete("/delete/:id", isAuthenticated, TechStackController.deleteTechStack);


export default router;
import express from "express";
import WorkExperienceController from '../controllers/workexperience.controller'
// import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get("/fetch", isAuthenticated, WorkExperienceController.fetchUserWorkExperience);
router.get("/user/fetch", isAuthenticated, WorkExperienceController.fetchUserWorkExperience);
router.get("/fetch/:username", WorkExperienceController.fetchByUsername);
router.post("/create", isAuthenticated, WorkExperienceController.createWorkExperience);
router.put("/update/:id", isAuthenticated, WorkExperienceController.updateWorkExperience);
router.delete("/delete/:id", isAuthenticated, WorkExperienceController.deleteWorkExperience);


export default router;
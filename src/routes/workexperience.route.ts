import express from "express";
import WorkExperienceController from '../controllers/workexperience.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, WorkExperienceController.fetchUserWorkExperience);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, WorkExperienceController.fetchUserWorkExperience);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, WorkExperienceController.fetchUserWorkExperience);
router.post<{}, MessageResponse>("/create", isAuthenticated, WorkExperienceController.createWorkExperience);
router.put<{}, MessageResponse>("/update/:id", isAuthenticated, WorkExperienceController.updateWorkExperience);
router.delete<{}, MessageResponse>("/delete/:id", isAuthenticated, WorkExperienceController.deleteWorkExperience);


export default router;
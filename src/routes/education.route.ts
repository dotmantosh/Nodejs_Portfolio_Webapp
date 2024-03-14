import express from "express";
import EducationController from '../controllers/education.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from '../middlewares/auth.middleware'

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, EducationController.fetchUserEducation);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, EducationController.fetchUserEducation);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, EducationController.fetchUserEducation);
router.post<{}, MessageResponse>("/create", isAuthenticated, EducationController.createEducation);
router.put<{}, MessageResponse>("/update/:id", isAuthenticated, EducationController.updateEducation);
router.delete<{}, MessageResponse>("/delete/:id", isAuthenticated, EducationController.deleteEducation);


export default router;
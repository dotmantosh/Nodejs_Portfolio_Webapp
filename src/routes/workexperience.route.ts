import express from "express";
import WorkExperienceController from '../controllers/workexperience.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", WorkExperienceController.fetchUserWorkExperience);
router.get < {},MessageResponse >("/user/fetch", WorkExperienceController.fetchUserWorkExperience);
router.get < {},MessageResponse >("/fetch/:id", WorkExperienceController.fetchUserWorkExperience);
router.post < {},MessageResponse >("/create", WorkExperienceController.createWorkExperience);
router.put < {},MessageResponse >("/update", WorkExperienceController.updateWorkExperience);
router.delete < {},MessageResponse >("/delete", WorkExperienceController.deleteWorkExperience);


export default router;
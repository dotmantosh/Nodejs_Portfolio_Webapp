import express from "express";
import EducationController from '../controllers/education.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", EducationController.fetchUserEducation);
router.get < {},MessageResponse >("/user/fetch", EducationController.fetchUserEducation);
router.get < {},MessageResponse >("/fetch/:id", EducationController.fetchUserEducation);
router.post < {},MessageResponse >("/create", EducationController.createEducation);
router.put < {},MessageResponse >("/update", EducationController.updateEducation);
router.delete < {},MessageResponse >("/delete", EducationController.deleteEducation);


export default router;
import express from "express";
import EducationController from '../controllers/education.controller'
import isAuthenticated from '../middlewares/auth.middleware'

const router = express.Router();

router.get("/fetch", isAuthenticated, EducationController.fetchUserEducation);
router.get("/user/fetch", isAuthenticated, EducationController.fetchUserEducation);
router.get("/fetch/:username", EducationController.fetchByUsername);
router.post("/create", isAuthenticated, EducationController.createEducation);
router.put("/update/:id", isAuthenticated, EducationController.updateEducation);
router.delete("/delete/:id", isAuthenticated, EducationController.deleteEducation);


export default router;
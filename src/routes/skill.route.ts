import express from "express";
import SkillController from '../controllers/skill.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, SkillController.fetchUserSkill);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, SkillController.fetchUserSkill);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, SkillController.fetchUserSkill);
router.post<{}, MessageResponse>("/create", isAuthenticated, SkillController.createSkill);
router.put<{}, MessageResponse>("/update/:id", isAuthenticated, SkillController.updateSkill);
router.delete<{}, MessageResponse>("/delete/:id", isAuthenticated, SkillController.deleteSkill);


export default router;
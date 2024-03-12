import express from "express";
import SkillController from '../controllers/skill.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", SkillController.fetchUserSkill);
router.get < {},MessageResponse >("/user/fetch", SkillController.fetchUserSkill);
router.get < {},MessageResponse >("/fetch/:id", SkillController.fetchUserSkill);
router.post < {},MessageResponse >("/create", SkillController.createSkill);
router.put < {},MessageResponse >("/update", SkillController.updateSkill);
router.delete < {},MessageResponse >("/delete", SkillController.deleteSkill);


export default router;
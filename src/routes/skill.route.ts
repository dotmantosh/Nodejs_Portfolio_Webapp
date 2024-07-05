import express from "express";
import SkillController from '../controllers/skill.controller'
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/ban-types
router.get("/fetch/all", SkillController.fetchAllSkills);
// eslint-disable-next-line @typescript-eslint/ban-types
router.get("/user/fetch", isAuthenticated, SkillController.fetchUserSkill);
// eslint-disable-next-line @typescript-eslint/ban-types
router.get("/fetch/:id", isAuthenticated, SkillController.fetchUserSkill);
// eslint-disable-next-line @typescript-eslint/ban-types
router.post("/create", SkillController.createSkill);
// eslint-disable-next-line @typescript-eslint/ban-types
router.put("/update/:id", isAuthenticated, SkillController.updateSkill);
// router.get("/update-imgUrl", SkillController.updateSkillsFromJsonFile);
// eslint-disable-next-line @typescript-eslint/ban-types
router.delete("/delete/:id", isAuthenticated, SkillController.deleteSkill);


export default router;
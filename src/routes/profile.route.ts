import express from "express";
import ProfileController from '../controllers/profile.controller'
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get("/fetch", isAuthenticated, ProfileController.fetchAllProfiles);
router.get("/user/fetch", isAuthenticated, ProfileController.fetchUserProfile);
router.get("/fetch/:username", ProfileController.fetchByUsername);
router.post("/create", isAuthenticated, ProfileController.createProfile);
router.put("/update/:id", isAuthenticated, ProfileController.updateProfile);
router.delete("/resume/delete/:id", isAuthenticated, ProfileController.deleteResume);
// router.put("/user/update", isAuthenticated, ProfileController.updateProfile);
router.delete("/delete/:id", isAuthenticated, ProfileController.deleteProfile);


export default router;
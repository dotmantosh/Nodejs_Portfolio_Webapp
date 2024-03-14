import express from "express";
import ProfileController from '../controllers/profile.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, ProfileController.fetchAllProfiles);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, ProfileController.fetchAllProfiles);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, ProfileController.fetchAllProfiles);
router.post<{}, MessageResponse>("/create", isAuthenticated, ProfileController.createProfile);
router.put<{}, MessageResponse>("/update/:id", isAuthenticated, ProfileController.updateProfile);
router.delete<{}, MessageResponse>("/delete/:id", isAuthenticated, ProfileController.deleteProfile);


export default router;
import express from "express";
import SocialMediaController from '../controllers/socialmedia.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get<{}, MessageResponse>("/fetch", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.get<{}, MessageResponse>("/user/fetch", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.get<{}, MessageResponse>("/fetch/:id", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.post<{}, MessageResponse>("/create", isAuthenticated, SocialMediaController.createSocialMedia);
router.put<{}, MessageResponse>("/update", isAuthenticated, SocialMediaController.updateSocialMedia);
router.delete<{}, MessageResponse>("/delete", isAuthenticated, SocialMediaController.deleteSocialMedia);


export default router;
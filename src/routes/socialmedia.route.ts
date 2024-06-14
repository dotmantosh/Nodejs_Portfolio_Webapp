import express from "express";
import SocialMediaController from '../controllers/socialmedia.controller'
import isAuthenticated from "../middlewares/auth.middleware"

const router = express.Router();

router.get("/fetch", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.get("/user/fetch", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.get("/fetch/:id", isAuthenticated, SocialMediaController.fetchUserSocialMedia);
router.post("/create", isAuthenticated, SocialMediaController.createSocialMedia);
router.put("/update", isAuthenticated, SocialMediaController.updateSocialMedia);
router.delete("/delete", isAuthenticated, SocialMediaController.deleteSocialMedia);


export default router;
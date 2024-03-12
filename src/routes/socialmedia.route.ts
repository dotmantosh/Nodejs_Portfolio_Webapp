import express from "express";
import SocialMediaController from '../controllers/socialmedia.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", SocialMediaController.fetchUserSocialMedia);
router.get < {},MessageResponse >("/user/fetch", SocialMediaController.fetchUserSocialMedia);
router.get < {},MessageResponse >("/fetch/:id", SocialMediaController.fetchUserSocialMedia);
router.post < {},MessageResponse >("/create", SocialMediaController.createSocialMedia);
router.put < {},MessageResponse >("/update", SocialMediaController.updateSocialMedia);
router.delete < {},MessageResponse >("/delete", SocialMediaController.deleteSocialMedia);


export default router;
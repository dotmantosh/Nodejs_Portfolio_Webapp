import express from "express";
import ProfileController from '../controllers/profile.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", ProfileController.fetchAllProfiles);
router.get < {},MessageResponse >("/user/fetch", ProfileController.fetchAllProfiles);
router.get < {},MessageResponse >("/fetch/:id", ProfileController.fetchAllProfiles);
router.post < {},MessageResponse >("/create", ProfileController.createProfile);
router.put < {},MessageResponse >("/update", ProfileController.updateProfile);
router.delete < {},MessageResponse >("/delete", ProfileController.deleteProfile);


export default router;
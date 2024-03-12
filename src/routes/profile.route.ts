import express from "express";
import ProfileController from '../controllers/profile.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/fetch", ProfileController.fetchAllProfiles);


export default router;
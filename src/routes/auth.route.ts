import express from "express";
import AuthController from '../controllers/auth.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.post<{}, MessageResponse>("/signup", AuthController.signUpUser);
router.post<{}, MessageResponse>("/login", AuthController.loginUser);
router.post<{}, MessageResponse>("/forgot-password", AuthController.forgotPassword);
router.post<{}, MessageResponse>("/reset-password", AuthController.resetPassword);
router.post<{}, MessageResponse>("/change-password", AuthController.changePassword);


export default router;
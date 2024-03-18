import express from "express";
import AuthController from '../controllers/auth.controller'
import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"
const router = express.Router();

router.post("/signup", AuthController.signUpUser);
router.post("/login", AuthController.loginUser);
router.post('/logout', isAuthenticated, AuthController.logoutUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.post("/change-password", AuthController.changePassword);


export default router;
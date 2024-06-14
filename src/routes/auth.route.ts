import express from "express";
import AuthController from '../controllers/auth.controller'
// import MessageResponse from "../interfaces/MessageResponse";
import isAuthenticated from "../middlewares/auth.middleware"
const router = express.Router();

router.post("/signup", AuthController.signUpUser);
router.post("/login", AuthController.loginUser);
router.get('/logout', isAuthenticated, AuthController.logoutUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.get("/validate-reset-password-link/:token", AuthController.validateResetToken);
router.post("/reset-password/:token", AuthController.resetPassword);
router.post("/change-password", isAuthenticated, AuthController.changePassword);


export default router;
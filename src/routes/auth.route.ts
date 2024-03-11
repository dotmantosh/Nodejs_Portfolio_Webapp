import express from "express";
import AuthController from '../controllers/auth.controller'
import MessageResponse from "../interfaces/MessageResponse";

const router = express.Router();

router.get < {},MessageResponse >("/users", AuthController.getUsers);


export default router;
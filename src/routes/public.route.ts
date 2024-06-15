import express from "express"
import PublicController from '../controllers/public.controller'

const router = express.Router();

router.post('/contact-us', PublicController.SendContactUsEmail)

export default router
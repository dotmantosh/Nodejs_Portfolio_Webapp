import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import auth from './auth.route'

const router = express.Router();

router.get < {},
  MessageResponse >
    ("/",
    (req, res) => {
      res.json({
        message: "API - 👋🌎🌍🌏",
      });
    });

router.use('/users', auth);
// router.use('/todos', todos)

export default router;

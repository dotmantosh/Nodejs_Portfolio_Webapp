import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import auth from './auth.route'
import profile from './profile.route'
import education from './education.route'
import project from './project.route'
import skill from './skill.route'
import techStack from './techStack.route'
import socialMedia from './socialmedia.route'
import workExperience from './workexperience.route'
import publicRoute from './public.route'

const router = express.Router();

router.get<object,
  MessageResponse>
  ("/",
    (req, res) => {
      res.json({
        message: "API - 👋🌎🌍🌏",
      });
    });
router.use('/public', publicRoute)
router.use('/user', auth);
router.use('/profile', profile);
router.use('/project', project);
router.use('/education', education);
router.use('/skill', skill);
router.use('/tech-stack', techStack);
router.use('/social-media', socialMedia);
router.use('/work-experience', workExperience);
// router.use('/todos', todos)

export default router;

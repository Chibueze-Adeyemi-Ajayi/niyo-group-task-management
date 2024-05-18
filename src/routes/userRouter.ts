import express from "express";
import { createUser, getAllUsers } from "../controllers/userController"
import { signup } from "../controllers/authController";

const router = express.Router();

router.post('/signup', signup)
router.route('/')
      .get(getAllUsers)
      .post(createUser)

export default router
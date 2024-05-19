import { Router } from "express";
import { UserMiddleWare } from "./user-middleware";
import { UserController } from "./user-controller";
import { controller_handler } from "../../utils/helpers";

const userRoute = Router();

const userMiddleWare = new UserMiddleWare(),
      userController = new UserController();

userRoute.post("/sign-up", 
userMiddleWare.validate_signup, 
async (req, res) => await controller_handler(res, await userController.sign_up(req.body.email, req.body.password)));

userRoute.post("/request-verification-code",
userMiddleWare.validate_otp_request, 
async (req, res) => await controller_handler(res, await userController.request_verification_code(req.body.email)));

userRoute.post("/verify-email",
userMiddleWare.validate_email_verification_request, 
async (req, res) => await controller_handler(res, await userController.verify_email(req.body.email, req.body.otp)));

userRoute.post("/sign-in", 
userMiddleWare.validate_signup, 
async (req, res) => await controller_handler(res, await userController.login(req.body.email, req.body.password)));

export default userRoute;
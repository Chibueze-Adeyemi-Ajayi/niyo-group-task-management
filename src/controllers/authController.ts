import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/userModel";
import { Response } from "express";
import { JWT_SECRET, JWT_EXPIRES_IN, NODE_ENV } from "../config/env";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Users, Options } from "../models/modelInterface";

let token: string;
const signToken = (id: string) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
}

const createSendToken = (user: Users, statusCode: number, res: Response) => {
    token = signToken(user._id)
    const cookieOptions: Options = {
        expires: new Date(Date.now() + JWT_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (NODE_ENV !== 'development') cookieOptions.secure = true
    res.cookie('jwt', token, cookieOptions)

    //remove password from the output
    user.password = undefined;

    res.status(statusCode).json({
        status: statusCode,
        token,
        data: {
            user,
        }
    })
}

export const signup = catchAsync(async (req, res, next) => {
    const newUser:any = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        token: token,
        refreshToken: token,
        UUID: crypto.randomUUID()
    })
    createSendToken(newUser, 201, res)
})
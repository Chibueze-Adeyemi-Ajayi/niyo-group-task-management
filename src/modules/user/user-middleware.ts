import { NextFunction, Request, Response } from "express";
import { sendError } from "../../utils/helpers";
import Joi from "joi";
import { user_otp_request_schema, user_otp_verification_schema, user_signup_schema } from "./user-schema";

export class UserMiddleWare {

    public validate_signup = async (req:Request, res:Response, next:NextFunction) => {
        try {
            let {body} = req;
            const error = Joi.attempt(body, user_signup_schema)
            next()
        } catch (error:any) {
            sendError(res, 400, error["details"][0]["message"]);
        }
    }

    public validate_otp_request = async (req:Request, res:Response, next:NextFunction) => {
        try {
            let {body} = req;
            const error = Joi.attempt(body, user_otp_request_schema)
            next()
        } catch (error:any) {
            sendError(res, 400, error["details"][0]["message"]);
        }
    }

    public validate_email_verification_request = async (req:Request, res:Response, next:NextFunction) => {
        try {
            let {body} = req;
            const error = Joi.attempt(body, user_otp_verification_schema)
            next()
        } catch (error:any) {
            sendError(res, 400, error["details"][0]["message"]);
        }
    }

}
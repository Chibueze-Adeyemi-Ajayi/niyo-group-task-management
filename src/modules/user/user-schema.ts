import Joi from "joi";

export const user_signup_schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required()
})

export const user_otp_request_schema = Joi.object({
    email: Joi.string().email().required()
})

export const user_otp_verification_schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required()
})

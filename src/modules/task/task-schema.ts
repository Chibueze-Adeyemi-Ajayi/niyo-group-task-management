// slug:string, title:string, time:string, date:any, content:string

import Joi from "joi";

export const task_schema = Joi.object({
    slug: Joi.string().email().optional(),
    title: Joi.string().required(),
    time: Joi.string().required(),
    date: Joi.date().required(),
    content: Joi.string().required(),
})

export const task_param_schema = Joi.object({
    param: Joi.string().required()
})
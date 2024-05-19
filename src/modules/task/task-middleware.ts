import Joi from "joi";
import { sendError } from "../../utils/helpers";
import { NextFunction, Response, Request } from "express";
import { task_param_schema, task_schema } from "./task-schema";
import { log } from "console";

export class TaskMiddleWare {

    public validate_task_creation = (req:Request, res:Response, next:NextFunction) => {
        try {
            let {body} = req;
            const error = Joi.attempt(body, task_schema)
            next()
        } catch (error:any) {
            sendError(res, 400, error["details"][0]["message"]);
        }
    }

    public validate_task_param = (req:Request, res:Response, next:NextFunction) => {
        try {
            let {params} = req;
            log(params)
            const error = Joi.attempt(params, task_param_schema)
            next()
        } catch (error:any) {
            sendError(res, 400, error["details"][0]["message"]);
        }
    }

}
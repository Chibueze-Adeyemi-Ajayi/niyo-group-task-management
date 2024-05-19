import { Router } from "express";
import { controller_handler } from "../../utils/helpers";
import { TaskController } from "./task-controller";
import { TaskMiddleWare } from "./task-middleware";
import { authorization, getUser } from "../../utils/security";

const taskRoute = Router();

const taskController = new TaskController(),
      taskMiddleware = new TaskMiddleWare();

taskRoute.use(authorization)

taskRoute.post("/create-task", 
taskMiddleware.validate_task_creation, 
async (req, res) => await controller_handler(res, await taskController.create_task(
    req.body.title, req.body.time,
    req.body.date, req.body.content,
    await getUser(req)
)));

taskRoute.post("/open-task/:param", 
taskMiddleware.validate_task_param, 
async (req, res) => await controller_handler(res, await taskController.read_task(
    req.params.param,
    await getUser(req)
)));

taskRoute.get("/list-tasks", 
async (req, res) => await controller_handler(res, await taskController.list_tasks(
    req.query.q, req.query.page, req.query.limit,
    await getUser(req)
)));

taskRoute.put("/update-task/:param", 
taskMiddleware.validate_task_creation, 
async (req, res) => await controller_handler(res, await taskController.update_task(
    req.params.param, req.body.title, req.body.time, req.body.date, req.body.content,
    await getUser(req)
)));

taskRoute.delete("/delete-task/:param", 
taskMiddleware.validate_task_param, 
async (req, res) => await controller_handler(res, await taskController.delete_task(
    req.params.param,
    await getUser(req)
)));

export default taskRoute;
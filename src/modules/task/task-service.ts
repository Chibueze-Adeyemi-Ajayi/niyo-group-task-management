import { Op } from "sequelize";
import { generateRandomSlug, getErrorObject, getSuccessObject } from "../../utils/helpers"
import User from "../user/user-model";
import Task from "./task-model";

export class TaskService {

    public create_task = async (title:string, time:string, date:any, content:string, user:User) => {
        try {

            var slug = generateRandomSlug(35)

            let task = await Task.create({title, time, date, content, slug})

            if (!task) return getErrorObject(500, "Unable to create task");

            await (<any>task).setUser(user)

            return getSuccessObject(task, "Task created successfully");
            
        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public read_task = async (slug:string, user:User) => {
        try {

            let task = await Task.findOne({where:{slug}});

            if (!task) return getErrorObject(404, "Task not found !");

            if ((<any>task).UserId != user.id) return getErrorObject(401, "Unauthorized to view task belonging to someone else");

            return getSuccessObject(await Task.findOne({where:{slug}, attributes: {exclude: ["verification_code", "password"]}}), "Successful")
            
        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public list_tasks = async (q:string, page:number, paginate:number, user:User) => {
        try {

            let q_ = q ? q : "", pg  = page ? page : 1, pg_ = paginate ? paginate : 10;

            return getSuccessObject(await (<any>Task).paginate({
                where: {
                    [Op.or]: {
                        title: {
                            [Op.like]: `%${q_}%`
                        },
                        content: {
                            [Op.like]: `%${q_}%`
                        }
                    }
                },
                page: pg, paginate:pg_, include: [
                    {
                        model: User, where: {id:user.id}, required: true,
                        attributes: {exclude: ["verification_code", "password", "jwt_token"]}
                    }
                ]
            }), "Successful")
            
        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public update_task = async (slug:string, title:string, time:string, date:any, content:string, user:User) => {
        try {

            let task = await Task.findOne({where:{slug}});

            if (!task) return getErrorObject(404, "Task not found !");

            if ((<any>task).UserId != user.id) return getErrorObject(401, "Unauthorized to update task belonging to someone else");

            return getSuccessObject(await task.update({
                title: title || task.title,
                time: time || task.time,
                date: date || task.date,
                content: content || task.content,
            }), "Update successful")

        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public delete_task = async (slug:string, user:User) => {
        try {

            let task = await Task.findOne({where:{slug}});

            if (!task) return getErrorObject(404, "Task not found !");

            if ((<any>task).UserId != user.id) return getErrorObject(401, "Unauthorized to delete task belonging to someone else");

            return getSuccessObject(await task.destroy(), "Delete successful");

        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

}
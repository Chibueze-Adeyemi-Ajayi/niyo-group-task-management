import User from "../user/user-model";
import { TaskService } from "./task-service"

export class TaskController {

    private taskService = new TaskService();

    public create_task = async (title:string, time:string, date:any, content:string, user:User) => {
       return await this.taskService.create_task(title, time, date, content, user)
    }

    public read_task = async (slug:string, user:User) => {
        return await this.taskService.read_task(slug, user)
    }

    public list_tasks = async (q:any, page:any, paginate:any, user:User) => {
        return await this.taskService.list_tasks(q, page, paginate, user)
    }

    public update_task = async (slug:string, title:string, time:string, date:any, content:string, user:User) => {
        return await this.taskService.update_task(slug, title, time, date, content, user)
    }

    public delete_task = async (slug:string, user:User) => {
        return await this.taskService.delete_task(slug, user)
    }

}
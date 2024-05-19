import { Socket } from "socket.io";
import { ISocket } from "./socket-interface";
import { TaskService } from "../../modules/task/task-service";
import User from "../../modules/user/user-model";

export class SockerIOManager {

    private taskService = new TaskService();

    public handleRequest = async (socket:Socket, data:ISocket) => {
        let {email, q, page, paginate} = data;
        // list all task belonging to user
        let user = await User.findOne({where:{email}});
        if (!user) socket.emit("User not found !");
        let tasks = (await this.taskService.list_tasks(q, page, paginate, user || new User()))
        socket.emit(JSON.stringify(tasks));
    }

}
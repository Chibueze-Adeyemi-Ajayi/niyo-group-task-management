import { UserService } from "./user-service"

export class UserController {

    private userService = new UserService();

    public sign_up = async (email:string, password:string) => {
        return await this.userService.sign_up(email, password);
    }

    public verify_email = async (email:string, otp:string) => {
        return await this.userService.verify_email(email, otp);
    }

    public request_verification_code = async (email:string) => {
        return await this.userService.request_verification_code(email);
    }

    public login = async (email:string, password:string) => {
        return await this.userService.login(email, password);
    }

}
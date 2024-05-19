import { logger } from "../../logger/logger";
import { MailService } from "../../third-party/email/email-manager";
import { generateOTP, getErrorObject, getSuccessObject, hashPassword, htmlWrapper } from "../../utils/helpers"
import { generateJWT } from "../../utils/security";
import User from "./user-model"

export class UserService {

    private emailService = new MailService();

    public sign_up = async (email:string, password:string) => {
        try {
            
            let exisitng_user = await User.findOne({where:{email}});
            
            if (exisitng_user)
                if (exisitng_user.is_verified) return getErrorObject(401, "User already exists with email");

            let verification_code = generateOTP(),
                pwd = await hashPassword(password);

            // send verification code email
            this.emailService.send({
                to: email,
                subject: "Niyo Verification Code",
                html: htmlWrapper(`
                    <div>
                        Hello <br><br>
                        Your verification code is <b>${verification_code}</b><br><br>
                    </div>
                `) 
            });

            let user = exisitng_user ? exisitng_user : await User.create({
                email, password:pwd, verification_code
            })

            setTimeout(function () {
                logger.info("verification code update");
                user.update({verification_code: generateOTP()})
            }, 1000 * 60 * 5)

            user.password = "???"; user.verification_code = "???"

            return getSuccessObject(user, "Account created successfully")

        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }


    public verify_email = async (email:string, otp:string) => {
        try { 

            let exisitng_user = await User.findOne({where:{email}});
            
            if (!exisitng_user)
                return getErrorObject(404, "Email address not found");

            if (exisitng_user.is_verified)
                return getSuccessObject(exisitng_user, "Account verified already")

            if (exisitng_user.verification_code != otp)
                return getErrorObject(401, "Incorrect OTP supplied");

            exisitng_user.update({is_verified:true})
            
            exisitng_user.password = "???"; exisitng_user.verification_code = "???"

            return getSuccessObject(exisitng_user, "Verification successful")

        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public request_verification_code = async (email:string) => {
        try {
            
            let exisitng_user = await User.findOne({where:{email}});
            
            if (!exisitng_user)
                return getErrorObject(404, "Email address not found");

            let verification_code = generateOTP();

            this.emailService.send({
                to: email,
                subject: "Niyo Verification Code",
                html: htmlWrapper(`
                    <div>
                        Hello <br><br>
                        Your verification code is <b>${verification_code}</b><br><br>
                    </div>
                `) 
            });

            await exisitng_user.update({verification_code})

            setTimeout(function () {
                logger.info("verification code update");
                if (exisitng_user)
                    exisitng_user.update({verification_code: generateOTP()})
            }, 1000 * 60 * 5)

            exisitng_user.password = "???"; exisitng_user.verification_code = "???"

            return getSuccessObject(exisitng_user, "Verification code successfully")

        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

    public login = async (email:string, password:string) => {
        try {

            let exisitng_user = await User.findOne({where:{email}, attributes:{
                exclude: ['verification_code']
            }});
            
            if (!exisitng_user)
                return getErrorObject(404, "Email address not found");

            if (exisitng_user.password != hashPassword(password)) {
                return getErrorObject(401, "Invalid password");
            }

            if (!exisitng_user.is_verified) 
                return getErrorObject(401, "Please verify your email");

            exisitng_user.password = "???";

            let jwt = generateJWT(exisitng_user);
            await exisitng_user.update({jwt_token:jwt})

            return getSuccessObject(exisitng_user, "Verification code successfully")
            
        } catch (error:any) {
            return getErrorObject(500, error.toString())
        }
    }

}
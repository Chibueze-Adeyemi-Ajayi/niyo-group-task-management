import { NextFunction, Request, Response } from "express";
// import AppError from "../utils/appError";
import User from "../models/userModel";
import { catchAsync } from "../utils/catchAsync";
import { generateOTP, htmlWrapper } from "../utils/helpers";
import { MailService } from "../services/email/mailService";
// import { MatchTrader } from "../services/match-trader/metaService";
// // import { logger } from "../logger/logger";
// import { IMatchTrader } from "../services/match-trader/metaInterface";
// import { log } from "console";

let emailService = new MailService();

export const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // demo Response

    const users = await User.find()
    res.status(200).json({
        status: true,
        // rolls: users.length,
        "data": users
    })
})

// real sign up is the auth controller
export const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await User.create(req.body);

    // // create a trading account for the user
    // let matchTrader:MatchTrader = await MatchTrader.getInstance(),
    //     // data = matchTrader.RESPONSE_DATA;
    //     // logger.error({data});
    //     payload:IMatchTrader = {
    //         offerId: "",
    //         email: "",
    //         password: "",
    //         partnerId: "",
    //         name: "",
    //         country: "",
    //         surname: "",
    //         dateOfBirth: "",
    //         phone: "",
    //         city: "",
    //         postCode: "",
    //         address: "",
    //         state: ""
    //     },
    //     result = await matchTrader.create_account(payload);
    //     // processing output result
    //     log(result);
    //     // update the user  with the returned info from MT server

    // create authentication code
    let otp = generateOTP(); // default is 4 digits, you can use generateOTP(numbersOfDigits)

    // stack authentication code to user schema


    // forward the email
    let {email} = req.body;
    await emailService.send({
        to: email,
        subject: "Email Verification",
        html: htmlWrapper(`<section>
            Hello, <br><br>
            Your email verifcation code is <b>${otp}</b>, valid within 5 minutes <br><br>
            &copy; Korab Team
        </section>`)
    });

    // update the otp after 5 minutes
    setTimeout(async () => {
        // update code goes in here
    }, 1000 * 60 * 5)

    // N:B default user schema's isVerified should be false

    res.status(201).json({
        status: true,
        data: doc
    })
})
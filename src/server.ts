import mongoose from "mongoose";
import { DEV_PORT, DATABASE, DATABASE_PASSWORD, NODE_ENV, VERSION } from "./config/env";
import { logger } from "./logger/logger";
import { log } from "console";
import app from "./app";
import dotenv from "dotenv";
import { MatchTrader } from "./services/match-trader/metaService";
import { IMatchTrader } from "./services/match-trader/metaInterface";
import { MailService } from "./services/email/mailService";
import { htmlWrapper } from "./utils/helpers";
// import { MatchTrader } from "./services/match-trader/metaService";

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! ❤️‍🔥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config/env' });

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD);
 
mongoose
    .connect(DB)
    .then(() => {
        console.log("DB connection successful")
    })
    .catch((err) => console.log('ERROR, ', err, {DB}))

console.log(NODE_ENV);

// env port
let port = process.env.PORT || DEV_PORT;
const server = app.listen(port, async () => {

    log("+++++++++++++++++++++++++[SERVER]+++++++++++++++++++++++++++++++");

    logger.info(`Korab exchange: { version: ${VERSION} }`)
    logger.info(`Server listening on PORT ${port}`);

    // // testing match trader
    // let matchTrader:MatchTrader = await MatchTrader.getInstance(),
    //     // data = matchTrader.RESPONSE_DATA;
    //     // logger.error({data});
    //     payload:IMatchTrader = {
    //         offerId: "",
    //         email: "abc@mail.com",
    //         password: "abc-password",
    //         partnerId: "",
    //         name: "abc user",
    //         country: "nig",
    //         surname: "abc",
    //         dateOfBirth: "",
    //         phone: "0985674839",
    //         city: "mit",
    //         postCode: "234",
    //         address: "ottawa canada",
    //         state: "ontario"
    //     },
    //     result = await matchTrader.create_account(payload);
    //     // processing output result
    //     log(result);

    // testing the web mail
    // await new MailService().send({
    //     to: "chibuezeadeyemi@gmail.com",
    //     subject: "Email Verification",
    //     html: htmlWrapper(`<section>
    //         Hello Jilo, <br><br>
    //         Your email verifcation code is <b>${12345}</b>, valid within 5 minutes <br><br>
    //         Korab Team    //     </section>`)
    // });

    log("+++++++++++++++++++++++++[SERVER]+++++++++++++++++++++++++++++++");

})

process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log('UNHANDLED REJECTION! ❤️‍🔥 Shutting down...')
    server.close(() => {
        process.exit(1)
    });
});
import { log } from "console";
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USERNAME } from "../../config/env";
import { MailInterface } from "./mailInterface";

export class MailService {

    private transporter;
    private nodemailer = require("nodemailer");
    
    constructor () {
        this.transporter = this.nodemailer.createTransport({
           host: EMAIL_HOST,
           port: 465,
           secure: true, 
           tls: {
            rejectUnauthorized: false, 
            ciphers: 'HIGH:!SSLv2:!aNULL:!eNULL:!IDEA:!LOW:!MD5:!PSK:!RC4:!SEED:!3DES:!SRP:!EXP:!FALLBACK_SCSV' // Supported ciphers
           },
           auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD 
           }
        }); 
    }
 
    public async send (options:MailInterface) {
        (<any>options)["from"] = EMAIL_USERNAME;
        log({options});
        return await this.transporter.sendMail(options)
    }
}
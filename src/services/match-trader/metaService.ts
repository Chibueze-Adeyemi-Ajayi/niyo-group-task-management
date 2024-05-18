import { log } from "console";
import { MATCH_TRADER_BROKER_ID, MATCH_TRADER_EMAIL, MATCH_TRADER_PASSWORD, MATCH_TRADER_URL } from "../../config/env";
import { logger } from "../../logger/logger";
import { Axios } from "../axios/axiosService";
import { IMatchTrader } from "./metaInterface";

export class MatchTrader {

    private static email:string = MATCH_TRADER_EMAIL;
    private static password:string = MATCH_TRADER_PASSWORD;
    private static borkerId:string = MATCH_TRADER_BROKER_ID;
    private static url:string = MATCH_TRADER_URL;

    public RESPONSE_DATA:object;

    private token:any = null;
    public static async getInstance():Promise<MatchTrader>{
        log(">>>>>>>>>>>>>>>>>>>>>>>>BROKER LOGIN>>>>>>>>>>>>>>>>>>>>>>");
        // logging in as broker
        let payload = {
            email: MatchTrader.email, password: MatchTrader.password, 
            borkerId: MatchTrader.borkerId
        }
        log({payload})
        let data = await Axios.post(`${MatchTrader.url}/co-login`, payload);
        log({data});
        let { token } = data;
        // returning instance
        return new MatchTrader(token, data);
    }

    public constructor (token:string, data:object) {
        this.token = token;
        this.RESPONSE_DATA = data; 
        log(this.token);
    }

    // creating an account for a user
    public async create_account(data:IMatchTrader): Promise < any > {
        return await Axios.post(`${MatchTrader.url}/user`, data, this.token);
    }

}

import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import User from "../modules/user/user-model";
import { NextFunction, Request, Response } from "express";
import { sendError } from "./helpers";

// JWT expires in 7 days
let signToken = (id: string) => {
    let genKey = jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
    return genKey;
}

export function generateJWT(user:User) {
  let key = signToken((user.id).toString());
  return key;
}

export function validateJWT(token:string) {
  return jwt.verify(token, JWT_SECRET);
}

export async function getUser(req:Request) {
  let token:any = req.headers.authorization || "";
      token = token.replace("Bearer ", "");
  return await User.findOne({where:{jwt_token:token}, attributes: {exclude:[
    "password", "verification_code"
  ]}}) || new User();
}

export function authorization (req:Request, res:Response, next:NextFunction) {
    try {
      let token:any = req.headers.authorization || "";
      token = token.replace("Bearer ", "");
      let decoded:any = validateJWT(token);
      if (decoded) next()
      else sendError(res, 401, "Unauthorize to access this endpoint")
    } catch (error:any) {
       sendError(res, 401, "Unauthorize to access this endpoint")
    }
}
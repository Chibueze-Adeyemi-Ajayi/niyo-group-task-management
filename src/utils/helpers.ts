import { Response } from "express";
import AppError from "./appError";

export function generateOTP(length:number = 4) {
    const digits = '0123456789';
    let otp = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      const randomDigit = digits[randomIndex];
      otp += randomDigit;
    }
  
    return otp;
  }

  export function htmlWrapper(content:string) {
    return `<div style='background:#eee'>
        <div style='padding:20px; width:200px; min-height:300px; margin:auto; line-spacing:20px; font-size: 18px; background:#fff'>
            ${content}
        </div>
    </div>`;
  }

  export function sendError (res:Response, status:number, message:any) {
    res.status(status).send(new AppError(message, status));
  }
  
  export function sendResponse (res:Response, result:object, message:string) {
    res.status(200).send({
      result, msg:message, status:"success", statusCode:200, isOperational:true
    }); 
  }

  export function controller_handler (res:Response, data: any) {
    if (data.hasOwnProperty("status")) {
      sendError(res, data.status, data.message);
    } else sendResponse(res, data.result, data.message,)
  } 

  export function getErrorObject (status:number, message:string) {
    return {status, message}
  }

  export function getSuccessObject (result:any, message:string) {
    return {result, message}
  }

const crypto = require('crypto');

  export function hashPassword(password:string) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const value = hash.digest('hex');
    return value;
  }

  export function generateRandomSlug(length = 6) {
    const charSet = 'abcdefghijklmnopqrstuvwxyz-0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      randomString += charSet.charAt(randomIndex);
    }
    return randomString;
  }

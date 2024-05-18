import { Types } from "mongoose";

export interface UserDoc extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    refreshToken: string;
    isVerified: boolean;
    UUID: string;
}

export interface Err {
    path: string;
    value: string;
    name: string;
    message: any;
    stack: string;
    isOperational: boolean;
    statusCode: number;
    status: any;
    errors: any
}


export interface Users {
    _id: string;
    password: undefined;
}

export interface Options {
    secure?: boolean;
    expires: Date;
    httpOnly: boolean;
}

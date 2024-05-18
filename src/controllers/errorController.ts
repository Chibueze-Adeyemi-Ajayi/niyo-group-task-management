import AppError from "../utils/appError";
import { Response, Request, NextFunction } from "express";
import { Err } from "../models/modelInterface";
import { NODE_ENV } from "../config/env";



const handleCastErrorDB = (err: Err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400)
}

const handleDuplicateFieldDB = (err: Err) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value)
    const message = `Duplicate field value: ${value} Please use another value`

    return new AppError(message, 400)
}

const handleJWTError = () => {
    new AppError('Invalid token. Please log in again!', 401)
}

const handleJWTExpiredError = () => {
    new AppError('Your token has expired! please login again', 401)
}

const handleValidationErrorDB = (err: Err) => {
    const errors = Object.values(err.errors).map((el: any) => el.message)

    const message = `Invalid input date. ${errors.join('. ')}`;
    return new AppError(message, 400)
}

const sendErrorDev = (err: Err, res: Response) => {
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message || err,
        stack: err.stack
    })
}
const sendErrorProd = (err: Err, res: Response) => {
    // Operational, trusted erro: send the message to the client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            stack: err.stack,
        })

        //Programming or Other unknown error: don't leak error details}
    } else {
        // 1) Log Error
        console.log("Error", err);

        // 2) Send generic message
        return res.status(500).json({
            status: "error",
            message: 'Something went very wrong'
        })
    }
}

export default (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (NODE_ENV === 'development') {
        sendErrorDev(err, res)
    }
    // if (NODE_ENV === 'production')
    else {
        let error = { ...err }
        error.message = err.message;
        if (error.name === 'castError') error = handleCastErrorDB(error)
        if (error.code === 11000) error = handleDuplicateFieldDB(error)
        if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError()

        sendErrorProd(error, res)
    }
    next()
}

import {/* DEV_PORT , VERSION, */ NODE_ENV } from "./config/env";
import userRouter from './routes/userRouter'
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from 'xss-clean';
import morgan from 'morgan';
import AppError from "./utils/appError";
import hpp from 'hpp';
import ExpressMongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
// import { logger } from "./logger/logger";
// import { log } from "console";
import globalErrorHandler from "./controllers/errorController";

const mongoSanitize = ExpressMongoSanitize()


// initiating express
const app = express()

// GLOBAL MIDDLEWARES
// SET THE SECURITY HEADERS
app.use(helmet())

// DEVELOPMENT LOGGING TO THE CONSOLE
if (NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// LIMIT REQUEST FROM THES SAME API
const limiter = rateLimit({
    max: 10,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour'
})

app.use('/api', limiter)

// Body parser middleware
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: false }));

// DATA SANITIZATION AGAINST NOSQL INJECTIONS
//app.use(mongoSanitize());

// DATA SANITIZATION
app.use(xss())

//PREVENTS PARAMETERS POLLUTIONS
app.use(
    hpp({
        whitelist: [
            // username
        ]
    })
)

// OUR STATIC SERVICING FOLDER/FILE
app.use(express.static(`${__dirname}/public`))

// ROUTE MIDDLEWARE TESTING
app.use((req, res, next) => {
    // req.requestTime = new Date().toDateString();
    next()
})

//Routes mdddleware
app.use('/api/v1/users', userRouter)

// CLIENT ATTEMPT TO USE NON-EXISTENT ROUTE 
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404))
})

app.use(globalErrorHandler);

export default app
import {BASE_URL, NODE_ENV } from "./config/env";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import xss from 'xss-clean';
import morgan from 'morgan';
import AppError from "./utils/appError";
import hpp from 'hpp';
import bodyParser from "body-parser";
import userRoute from "./modules/user/user-route";
import taskRoute from "./modules/task/task-route";
import cors from "cors";

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

// DATA SANITIZATION
app.use(xss())

//PREVENTS PARAMETERS POLLUTIONS
app.use(
    hpp({
        whitelist: [
            // username
        ]
    })
);

// OUR STATIC SERVICING FOLDER/FILE
app.use(express.static(`${__dirname}/public`));

// CORS
const corsOptions = {
    origin: "*", 
    methods: 'GET,POST,PUT,DELETE', 
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true 
};

app.use(cors(corsOptions));

app.use(`${BASE_URL}/users`, userRoute);
app.use(`${BASE_URL}/tasks`, taskRoute);
 
// CLIENT ATTEMPT TO USE NON-EXISTENT ROUTE 
app.all("*", (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this Server`, 404))
});

export default app
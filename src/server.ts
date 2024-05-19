import { DEV_PORT, NODE_ENV, SOCKET_PORT, VERSION } from "./config/env";
import { logger } from "./logger/logger";
import { log } from "console";
import app from "./app";
import dotenv from "dotenv";
import sequelize from "./config/db";
import { Socket } from "socket.io";
import { SockerIOManager } from "./third-party/socket-io/socket-manager";

const io = require('socket.io')();

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! ❤️‍🔥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config/env' });

console.log(NODE_ENV);

// env port
let port = process.env.PORT || DEV_PORT;

var socketManager = new SockerIOManager();

const server = app.listen(port, async () => {

    log("+++++++++++++++++++++++++[SERVER]+++++++++++++++++++++++++++++++");

    logger.info(`Niyo Group Task Management API: { version: ${VERSION} }`)
    logger.info(`Server listening on PORT ${port}`);

    logger.warn("Attempting to connect to database")

    // database connection
    sequelize.sync({alter:false, force:false}).then(() => {
        logger.info("Database connection successful");
    }).catch(err => {
        logger.error(`Error connecting to database: ${err}`);
    }); 

    // socket IO implementation
    logger.warn("Enabling Socket IO for real time data streaming")
    io.on('connection', async (socket:Socket) => { 
        logger.info("New connection"); log(socket);
        // perform real time operation
        socket.emit("connection", "Successfully connected !")
        socket.on("request", (data) => {
            logger.info("New request")
            log({data})
            socketManager.handleRequest(socket, data)
        });
    });
    io.listen(SOCKET_PORT, () => {logger.info("Socket IO implementation successful!")});
 
    log("+++++++++++++++++++++++++[SERVER]+++++++++++++++++++++++++++++++");

})

process.on('unhandledRejection', (err) => {
    console.log(err);
    console.log('UNHANDLED REJECTION! ❤️‍🔥 Shutting down...')
    server.close(() => {
        process.exit(1)
    });
}); 
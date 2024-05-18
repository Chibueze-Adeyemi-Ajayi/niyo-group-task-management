require('dotenv').config();

/*
* Enviromental variables will be exported her
*/

// development port
export const DEV_PORT = process.env.DEV_PORT || "8080";

//  Development Environments
export const NODE_ENV = process.env.NODE_ENV || '';

// JWT 
export const JWT_SECRET = process.env.JWT_SECRET || '';
export const JWT_EXPIRES_IN = 90;

// database password
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "";

// database
export const DATABASE = process.env.DATABASE || ""

// version
export const VERSION = process.env.VERSION || '1.0.0';

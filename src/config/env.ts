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

// version
export const VERSION = process.env.VERSION || '1.0.0';

// PG SQL
export const PGSQL_PASSWORD = process.env.PGSQL_PASSWORD || "";
export const PGSQL_USERNAME = process.env.PGSQL_USERNAME || "";
export const PGSQL_HOST = process.env.PGSQL_HOST || "";
export const PGSQL_DB = process.env.PGSQL_DB || "";
export const PGSQL_PORT = process.env.PGSQL_PORT || "";

export const BASE_URL = "/niyo-api/v1";

export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || ""
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || ''
export const EMAIL_HOST = process.env.EMAIL_HOST || ""

export const SOCKET_PORT = process.env.SOCKET_PORT || ""
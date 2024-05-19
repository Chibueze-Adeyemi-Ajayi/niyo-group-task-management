import { Sequelize } from "sequelize";
import { PGSQL_DB, PGSQL_HOST, PGSQL_PASSWORD, PGSQL_PORT, PGSQL_USERNAME } from "./env";

const dbConfig = {
    'development': {
      username: PGSQL_USERNAME,
      password: PGSQL_PASSWORD,
      database: PGSQL_DB,
      host: PGSQL_HOST,
      port: PGSQL_PORT,
      dialect: 'postgres',
      models: [],
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    },
  };

  let config:any = dbConfig["development"];
  const sequelize = new Sequelize(config)

  export default sequelize 
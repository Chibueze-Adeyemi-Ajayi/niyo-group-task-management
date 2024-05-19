## Readme.md

**Project Name:** Niyo Group Assessment Project

**Description:**

This project is a backend API built with TypeScript, Express.js, and PostgreSQL that provides features for user authentication, CRUD operations on tasks, input validation, and real-time communication using Socket.IO.

**Features:**

- User Authentication with JWT (JSON Web Token)
- Create, Read, Update, and Delete (CRUD) operations for tasks
- Input Validation to ensure data integrity
- Real-time communication with Socket.IO for live updates

**Prerequisites:**

- Node.js and npm (or yarn) installed on your system ([https://nodejs.org/](https://nodejs.org/))
- PostgreSQL database server installed and running ([https://www.postgresql.org/](https://www.postgresql.org/))

**Installation:**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Chibueze-Adeyemi-Ajayi/niyo-group-task-management.git
   cd niyo-group-task-management
   ```

2. **Install dependencies:**

   ```bash
   npm install  # or yarn install
   ```

**Configuration:**

**1. Environment Variables:**

   Create a `.env` file in the project root directory to store sensitive information like database connection details and JWT secret. You can use a package like `dotenv` to load these variables into your application. Here's an example `.env` file:

   ```
    DEV_PORT = 8080
    VERSION = "1.0.0"
    NODE_ENV = 'development';

    JWT_SECRET = jwt_Secret;
    JWT_EXPIRES_IN = 90;

    PGSQL_PASSWORD = postgresql_password
    PGSQL_USERNAME = postgresql_username
    PGSQL_HOST = postgresql_host
    PGSQL_DB = postgresql_database
    PGSQL_PORT = 5432

    EMAIL_USERNAME = webmail_username
    EMAIL_PASSWORD = webmail_password
    EMAIL_HOST = webmail_host

    SOCKET_PORT = 3000
   ```

**2. Database Setup:**

   - Create a PostgreSQL database and user with appropriate permissions.
   - Consider creating a schema within the database to organize your tables.

**3. (Optional) Migrations:**

   - If using a migration framework like `TypeORM` for database schema management, run the necessary commands to set up the database schema.

**Running the Application:**

There are multiple ways to run the application depending on your development workflow:

1. **Development Mode (Hot Reloading):**

    DOS Machines (Windows)

   ```bash
   npm run start  # or yarn start
   ```

   This will start the server in development mode with hot reloading enabled using Nodemon and concurrently run the TypeScript compiler to watch for changes. 
   
   Unix Machines (Linux)

   ```bash
   npm run start-unix  # or yarn start-unix
   ```

2. **Development Mode (Separate Terminals):**

   ```bash
   npm run dev  # or yarn dev
   ```

   This will run the start the server command (`nodemon build/server.js`).

3. **Production Mode:**

   ```bash
   npm run start-prod  # or yarn start-prod
   ```

   This will build the project (compile TypeScript) and start the server in production mode.

**Usage:**

- Refer to the API documentation (https://documenter.getpostman.com/view/27322899/2sA3QmCZkX) for specific endpoints, request formats, and response structures. 
- Use tools like Postman or curl to send requests to the API and interact with your backend functionality.

**Testing:**

- While the provided scripts don't include specific test commands, consider implementing unit and integration tests using frameworks like Jest and TypeORM for testing your API endpoints and database interactions.

**Additional Notes:**

- This readme provides a general structure. You can modify it to include specific details about your project, such as deployment instructions, frontend integration information (if applicable), and any additional dependencies or tools used.

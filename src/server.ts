import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';
import mainRoutes from './routes/main'; // Update the import path

import { env } from './config';

const app = express();
const logger = morgan('short');


// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

async function connectToDatabase() {
    const dbConnectionStr = env.DB_STRING;
    const dbName = 'eventPro';

    try {
        const client = await MongoClient.connect(dbConnectionStr);
        console.log(`Connected to ${dbName} Database`);
        return client.db(dbName) as Db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

async function startApp() {
    const db = await connectToDatabase();

    if (!db) {
        console.error('Failed to connect to the database. Exiting...');
        return;
    }

    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    // app.get('/', (req, res) => {
    //     res.send('Hello EventProSolutions!');
    // });

    app.use("/", mainRoutes);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

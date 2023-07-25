import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { MongoClient, Db } from 'mongodb';

const app = express();
const logger = morgan('short');

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

async function connectToDatabase() {
    const dbConnectionStr = process.env.DB_STRING;
    const dbName = 'eventPro';

    if (!dbConnectionStr) {
        console.error('DB_STRING environment variable is not set.');
        return;
    }

    try {
        const client = await MongoClient.connect(dbConnectionStr, );
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

    app.get('/', (req, res) => {
        res.send('Hello EventProSolutions!');
    });

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`);
    });
}

startApp();

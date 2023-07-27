import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import mainRoutes from './routes/main'; // Update the import path

import { env } from './config';

const app = express();
const logger = morgan('short');

// Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

async function connectToDatabase() {
    const dbConnectionStr = env.DB_STRING;
    const dbName = 'eventPro';

    try {
        await mongoose.connect(dbConnectionStr);
        console.log(`Connected to ${dbName} Database`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

async function startApp() {
    await connectToDatabase();

    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    app.use('/', mainRoutes);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

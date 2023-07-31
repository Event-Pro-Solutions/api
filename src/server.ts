import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import eventRouter from './routes/events';

import { env } from './config';

const app = express();
const logger = morgan('short');

async function startApp() {
    // Connect Database
    await connectDB();

    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    app.use('/auth', authRoutes);
    app.use('/events', eventRouter);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

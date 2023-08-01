import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/database';
import mainRoutes from './routes/main';
import authRoutes from './routes/auth';

import { env } from './config';

const app = express();
const logger = morgan('short');

async function startApp() {
    // Connect Database
    await connectDB();

    app.use(express.json());
    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    app.use('/', mainRoutes);
    app.use('/auth', authRoutes);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/database';
import authRoutes from './routes/auth';
import eventRouter from './routes/events';
import userRouter from './routes/users';

import { env } from './config';
import passport from 'passport';

const app = express();
const logger = morgan('short');

async function startApp() {
    // Connect Database
    await connectDB();

    app.use(express.json());
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            // TODO: Update secret add it to environment variables
            secret: 'secret',
        })
    );
    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', authRoutes);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

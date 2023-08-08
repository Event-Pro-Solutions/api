import express from 'express';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import connectDB from './config/database';
import authRouter from './routes/authRoutes';
import eventRouter from './routes/eventRoutes';
import userRouter from './routes/userRoutes';

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
            secret: env.SECRET,
            store: new MongoStore({ client: mongoose.connection.getClient() }),
            // cookie: {
            //     secure: true
            // }
        })
    );
    app.use(logger);

    // Simple Usage (Enable All CORS Requests)
    app.use(cors());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/auth', authRouter);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);

    app.listen(env.PORT, () => {
        console.log(`Example app listening on port ${env.PORT}`);
    });
}

startApp();

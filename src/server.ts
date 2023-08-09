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

    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
    };
    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: env.SECRET,
            store: new MongoStore({ client: mongoose.connection.getClient() }),
            cookie: {
                //TODO: Update to secure:true in deployment since we are using HTTPS on Vercel
                secure: false,  // Assuming you're always running on HTTPS since the frontend is on Vercel.
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                sameSite: "none"
            }
        })
    );
    
    app.use(logger);

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

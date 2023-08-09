import express from 'express';
import morgan from 'morgan';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';

import connectDB from './config/database';
import { env } from './config';
import authRouter from './routes/authRoutes';
import eventRouter from './routes/eventRoutes';
import userRouter from './routes/userRoutes';

// Initialize the express app
const app = express();

// Middlewares Configuration
function configureMiddleware() {
    // Logger
    const logger = morgan('short');
    app.use(logger);

    // CORS Configuration
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
    };
    app.use(cors(corsOptions));

    // Express Middlewares
    app.use(express.json());

    // Session Configuration
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: env.SECRET,
            store: new MongoStore({ client: mongoose.connection.getClient() }),
            cookie: {
                //TODO: Update to secure:true in deployment since we are using HTTPS on Vercel
                secure: false,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24, // 1 day
                sameSite: "none"
            }
        })
    );

    // Passport Configuration
    app.use(passport.initialize());
    app.use(passport.session());
}

// Routes Configuration
function configureRoutes() {
    app.use('/auth', authRouter);
    app.use('/events', eventRouter);
    app.use('/users', userRouter);
}

// Start the server
async function startApp() {
    // Connect to Database
    await connectDB();

    // Configure Middlewares and Routes
    configureMiddleware();
    configureRoutes();

    // Start the express server
    app.listen(env.PORT, () => {
        console.log(`Server listening on port ${env.PORT}`);
    });
}

// Trigger the server start process
startApp();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
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
    const allowedOrigins = ['http://localhost:3000', 'https://event-pro-frontend.vercel.app'];

    const corsOptions = {
        origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
            if (origin && allowedOrigins.includes(origin)) {
                callback(null, true);
            } else if (!origin) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie']
    };

    app.use(cors(corsOptions));

    // Express Middlewares
    app.use(express.json());

    // Passport Configuration
    app.use(passport.initialize());
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

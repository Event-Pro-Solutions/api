import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/userModel';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { IVerifyOptions } from 'passport-local';
import jwt from 'jsonwebtoken';
import { env } from '../config';
import '../config/passport';

const SECRET_KEY = env.SECRET; // Ideally, retrieve this from an environment variable for better security

type SignUpBody = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export const signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, email, username, password }: SignUpBody = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        username,
        password: hashedPassword,
    });

    try {
        const createdUser = await user.save();

        if (createdUser) {
            const token = jwt.sign({ id: createdUser._id }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token, user: createdUser });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        } else {
            return res.status(500).json({ message: 'An unexpected error occurred' });
        }
            }
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    passport.authenticate(
        'local',
        (err: Error, user: IUser, info: IVerifyOptions) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({ message: info.message });
            }

            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token, user });
        }
    )(req, res, next);
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
    // Since we are using JWTs, the client should simply discard the token to "log out"
    // There isn't a server-side logout mechanism with JWT as there is with sessions.
    return res.json({ message: 'Logged out successfully' });
};

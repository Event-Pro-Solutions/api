import { Request, Response, NextFunction } from 'express';
import user, { IUser } from '../models/user';
import bcrypt from 'bcrypt';
import passport, { DoneCallback } from 'passport';
import { IVerifyOptions } from 'passport-local';
import '../config/passport';

type SignUpBody = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export const signUp = async (req: Request, res: Response) => {
    const { name, email, username, password }: SignUpBody = req.body;

    if (!name || !email || !username || !password) {
        return res.status(400).json({ message: 'All fields required' });
    }

    const duplicate = await user.findOne({ username }).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserObject = new user({
        name,
        email,
        username,
        password: hashedPassword,
    });

    const newUser = await user.create(newUserObject);

    if (newUser) {
        return res.status(201).json({ message: 'User created' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
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

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res
                    .status(200)
                    .json({ message: 'Logged in successfully' });
            });
        }
    )(req, res, next);
};

export const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.send({ message: 'Logged out successfully' });
    });
};

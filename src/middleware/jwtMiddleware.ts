import jwt from 'jsonwebtoken';
import { env } from '../config';
import { Request, Response, NextFunction } from 'express';

interface IRequest extends Request {
    userId?: string;
}

interface IJwtPayload {
    id: string;
}

const SECRET_KEY = env.SECRET;

export const validateJwt = (req: IRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.status(403).json({ error: 'No authorization header provided' });
        return;    }
    
    const tokenParts = authHeader.split(" ");
    
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        res.status(403).json({ error: 'Malformed token' });
        return;
    }
    
    const token = tokenParts[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }

        const payload = decoded as IJwtPayload;
        req.userId = payload.id;
        next();
    });
};

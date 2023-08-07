import { Request, Response, NextFunction } from 'express';

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        // Return JSON response instead of redirecting. The client-side application can then decide how to handle this, e.g., redirecting the user to the login page.
        res.status(401).json({ error: 'User is not authenticated' });  
    }
};
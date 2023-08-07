import { Request, Response, NextFunction } from 'express';

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login?error=not_authenticated");  // if not authenticated, redirect to the login page with the query parameter "not_authenticated"
    }
};
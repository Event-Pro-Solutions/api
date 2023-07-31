import { Router, Response, Request, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';

const router: Router = Router();

// Query the db for the user and verify the hashed password
passport.use(
    new LocalStategy(function verify(username, password, cb) {
        return cb(null);
    })
);

router.post(
    '/login',
    passport.authenticate('local'),
    function (_, res: Response) {
        res.redirect('/');
    }
);

router.post(
    '/logout',
    function (req: Request, res: Response, next: NextFunction) {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
    }
);

// Hash password and insert new usr to db
router.post(
    '/signup',
    function (req: Request, res: Response, next: NextFunction) {}
);

export default router;

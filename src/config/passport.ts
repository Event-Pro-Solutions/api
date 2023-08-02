import passport from 'passport';
import { Strategy as LocalStategy } from 'passport-local';
import bcrypt from 'bcrypt';
import user, { IUser } from '../models/user';

passport.serializeUser((user, done) => {
    done(undefined, user);
});

passport.deserializeUser(function (user: IUser, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

passport.use(
    new LocalStategy(async (username, password, done) => {
        const foundUser = await user.findOne({ username }).exec();

        if (!foundUser) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const match = await bcrypt.compare(password, foundUser.password);

        if (match) {
            return done(undefined, foundUser);
        }

        return done(undefined, false, {
            message: 'Invalid username or password',
        });
    })
);

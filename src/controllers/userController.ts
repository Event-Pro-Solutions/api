import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

class UserController {
    static async getAllUserEvents(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findById(req.params.id);

            if (user) {
                return res.status(200).json( {user} );
            } else {
                return res.status(404).json( {error: 'User not found'});
            }

        } catch (err) {
            return res.status(500).json({ err });
        }
    }
    static async getUserRegisteredEvents(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findById(req.params.id);

            if (user) {
                return res.status(200).json(user.registeredEvents);
            } else {
                return res.status(404).json( {error: 'User not found'});
            }

        } catch (err) {
            return res.status(500).json({ err });
        }
    }
    static async getUserManagedEvents(req: Request, res: Response) {
        try {
            const user: IUser | null = await User.findById(req.params.id);

            console.log(user?.managedEvents)

            if (user) {
                return res.status(200).json( user.managedEvents );
            } else {
                return res.status(404).json( {error: 'User not found'});
            }

        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}


export default UserController;
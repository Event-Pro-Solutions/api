import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

class UserController {
    static async getAllUserEvents(req: Request, res: Response) {
        try {
            const users: IUser[] = await User.find({})
            console.log(users)
            return res.status(200).json({ users });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}


export default UserController;
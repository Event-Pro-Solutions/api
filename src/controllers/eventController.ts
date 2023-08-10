import { Request, Response } from 'express';
import Event, { IEvent } from '../models/eventModel';
import User from '../models/userModel';

class EventController {
    static async getAllEvents(req: Request, res: Response) {
        try {
            const events: IEvent[] = await Event.find({});
            return res.status(200).json({ events });
        } catch (err) {
            return res.status(500).json({ error: (err as Error).message });
        }
    }
    static async getEventById(req: Request, res: Response) {
        try {
            const event: IEvent | null = await Event.findById(req.params.id);
            if (event) {
                return res.status(200).json({ event });
            } else {
                return res.status(404).json({ error: 'Event not found' });
            }
        } catch (err) {
            return res.status(500).json({ error: (err as Error).message });
        }
    }

    static async createEvent(req: Request, res: Response) {


        const {
            _id,
            name,
            is_virtual,
            location,
            startDatetime,
            endDatetime,
            price,
            tags,
            imgUrl,
            description,
        }: IEvent = req.body;

        if (!name || !startDatetime || !endDatetime || !price) {
            return res
                .status(400)
                .json({ message: 'Required field(s) missing' });
        }

        console.log('here 1')

        try {
            const event = await Event.create({
                name,
                is_virtual,
                location,
                startDatetime,
                endDatetime,
                price,
                tags,
                creatorId: _id,
                imgUrl,
                description,
            });

            console.log('here 2')


            if (event) {
                console.log('here 3')
                const user = await User.findById(_id);
                console.log(typeof user, user)
                console.log(typeof _id, _id)                


                user?.managedEvents.push(event._id);
                await user?.save();

                return res.status(201).json({ message: 'Event created' });
            } else {
                return res
                    .status(400)
                    .json({ message: 'Invalid event data received' });
            }
        } catch (err) {
            return res.status(500).json({ message: 'Error creating event' });
        }
    }
}

export default EventController;

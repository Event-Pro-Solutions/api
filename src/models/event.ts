import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for the Event model
interface IEvent {
  name: string;
  is_virtual: boolean;
  location: string;
  startDatetime: Date;
  endDatetime: Date;
  price: number;
  tags: string[];
  creatorId: string;      // Foreign key referencing the User model
  managedBy: string[];    // Array of foreign keys referencing the User model
  description: string;
}

// Interface for the Event model document
interface IEventDoc extends IEvent, Document {}

// Interface for the Event model itself
interface IEventModel extends Model<IEventDoc> {}

// Creating a new Mongoose schema for the Event model
const EventSchema = new Schema<IEvent>(
    {
      name: { type: String, required: true },
      is_virtual: { type: Boolean, required: true },
      location: { type: String, required: true },
      startDatetime: { type: Date, required: true },
      endDatetime: { type: Date, required: true },
      price: { type: Number, required: true },
      tags: [{ type: String, required: true }],
      creatorId: { type: String, ref: "User", required: true },
      managedBy: [{ type: String, ref: "User", required: true }],
      description: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

// Creating the Event model based on the EventSchema
const Event: IEventModel = mongoose.model<IEventDoc, IEventModel>("Event", EventSchema);

export default Event;

import mongoose, { Document, Model } from "mongoose";

interface IUser {
  userName: string;
  email: string;
  password: string;
  registeredEvents: string[]; // Array of event IDs for registered events
  managedEvents: string[]; // Array of event IDs for managed events
}

interface IUserModel extends Model<IUserDoc> {}

interface IUserDoc extends IUser, Document {}

const UserSchema = new mongoose.Schema<IUser>(
  {
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    registeredEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
    managedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  {
    timestamps: true,
  }
);

const User: IUserModel = mongoose.model<IUserDoc, IUserModel>("User", UserSchema);

export default User;

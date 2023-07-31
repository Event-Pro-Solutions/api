import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  registeredEvents: Schema.Types.ObjectId[];
  imageUrl: string;
  managedEvents: Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  registeredEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  imageUrl: { type: String },
  managedEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
});

export default mongoose.model<IUser>('User', UserSchema);

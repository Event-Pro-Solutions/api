import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  is_virtual: boolean;
  location: string;
  startDatetime: Date;
  endDatetime: Date;
  price: number;
  tags: string[];
  creatorId: Schema.Types.ObjectId;
  managedBy: Schema.Types.ObjectId[];
  imgUrl: string;
  description: string;
}

const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  is_virtual: { type: Boolean, required: true },
  location: { type: String },
  startDatetime: { type: Date, required: true },
  endDatetime: { type: Date, required: true },
  price: { type: Number, required: true },
  tags: [{ type: String }],
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  managedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  imgUrl: { type: String },
  description: { type: String, required: true },
});

export default mongoose.model<IEvent>('Event', EventSchema);
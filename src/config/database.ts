import mongoose from 'mongoose';
import { env } from '../config';

const connectDB = async () => {
  try {
    const dbString = env.DB_STRING;
    if (!dbString) {
      throw new Error('DB_STRING environment variable is not defined.');
    }

    const conn = await mongoose.connect(dbString, {
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;

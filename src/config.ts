import { envsafe, port, str } from "envsafe";
import dotenv from "dotenv";
dotenv.config();

export const env = envsafe({
  DB_STRING: str(),
  PORT: port(),
});

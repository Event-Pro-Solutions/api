import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;
const logger = morgan('short');

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

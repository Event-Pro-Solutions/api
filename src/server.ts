import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { MongoClient } from 'mongodb';

// Now you can use MongoClient as you would in the original code

const app = express();
const port = 3000;
const logger = morgan('short');

// Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Connect database
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'eventPro';

if (!dbConnectionStr) {
    console.error('DB_STRING environment variable is not set.');
} else {
    MongoClient.connect(dbConnectionStr, )
        .then(client => {
            console.log(`Connected to ${dbName} Database`);
            db = client.db(dbName);
        })
        .catch(error => {
            console.error('Error connecting to the database:', error);
        });
}

app.use(logger);

// Simple Usage (Enable All CORS Requests)
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`);
});

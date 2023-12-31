import { MongoClient } from 'mongodb';
import { env } from './config';

const uri = env.DB_STRING;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        const users = client.db("test").collection("users");
        const events = client.db("test").collection("events");

        const userDocs = [
            {
              "name": "John Doe",
              "email": "john@example.com",
              "username": "johndoe",
              "password": "hashed_password_1",
              "registeredEvents": ["60d5ecb8b48738759f80f840", "60d5ecb8b48738759f80f841"],
              "imageUrl": "http://example.com/image1.png",
              "managedEvents": []
            },
            {
              "name": "Jane Doe",
              "email": "jane@example.com",
              "username": "janedoe",
              "password": "hashed_password_2",
              "registeredEvents": [],
              "imageUrl": "http://example.com/image2.png",
              "managedEvents": []
            },
            {
              "name": "Robert Smith",
              "email": "robert@example.com",
              "username": "robertsmith",
              "password": "hashed_password_3",
              "registeredEvents": ["60d5ecb8b48738759f80f847"],
              "imageUrl": "http://example.com/image3.png",
              "managedEvents": []
            }
          ]
          ;

        const eventDocs = [
            {
              "name": "Event 1",
              "is_virtual": true,
              "location": "Online",
              "startDatetime": "2023-08-01T18:00:00Z",
              "endDatetime": "2023-08-01T20:00:00Z",
              "price": 15.0,
              "tags": ["Social Activities", "Entertainment"],
              "creatorId": "60d5ecb8b48738759f80f840",
              "managedBy": [],
              "imgUrl": "http://example.com/event1.png",
              "description": "This is a description for Event 1"
            },
            {
              "name": "Event 2",
              "is_virtual": false,
              "location": "New York, NY",
              "startDatetime": "2023-08-02T18:00:00Z",
              "endDatetime": "2023-08-02T20:00:00Z",
              "price": 20.0,
              "tags": [],
              "creatorId": "60d5ecb8b48738759f80f842",
              "managedBy": [],
              "imgUrl": "http://example.com/event2.png",
              "description": "This is a description for Event 2"
            },
            {
              "name": "Event 3",
              "is_virtual": true,
              "location": "Boston, MA",
              "startDatetime": "2023-08-03T18:00:00Z",
              "endDatetime": "2023-08-03T20:00:00Z",
              "price": 10.0,
              "tags": ["Sports and Hobbies"],
              "creatorId": "60d5ecb8b48738759f80f844",
              "managedBy": [],
              "imgUrl": "http://example.com/event3.png",
              "description": "This is a description for Event 3"
            }
          ]
          ;

        await users.insertMany(userDocs);
        await events.insertMany(eventDocs);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

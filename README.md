# Event Pro API
A RESTful API built with Node.js, Express, TypeScript, and MongoDB. It provides endpoints to manage Users and Events. It's designed to serve data to a front-end application where the rendering happens.

## Technologies Used
- Node.js
- Express.js
- TypeScript
- MongoDB (with Mongoose)

## Requirements
- Node.js
- MongoDB instance (local or cloud)

## Installation
Clone the repository:  
git clone https://github.com/Event-Pro-Solutions/api

Install the dependencies:  
npm install

## Environment Variables
Create a .env file in the root directory and set the following variables:  
DB_STRING=<your_mongodb_connection_string>  
PORT=<port_to_run_the_server_on>

## API Documentation
### User Routes  
<!-- GET /users            Fetch all users  
GET /users/:id        Fetch a single user by id  
POST /users           Create a new user   -->

### Event Routes  
GET /events                 Fetch all events  
GET /events/:id       Fetch a single event by id  
<!-- POST /events          Create a new event  
PUT /events/:id       Update an existing event  
DELETE /events/:id    Delete an event   -->

## Running the Project  
Then, to run the project locally, use:  
npm start

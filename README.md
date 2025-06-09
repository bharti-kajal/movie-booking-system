# Movie Booking System API
A simple REST API for a Movie Booking System built using Node.js, Express, MongoDB, Mongoose, JWT authentication, and bcrypt for password hashing.

## Features
- User Authentication (Register / Login) using JWT
- CRUD operations for Movies (title, description, duration, genre)
- Booking API to create bookings and view user bookings
- Pagination & filtering on movies
- Password hashing with bcrypt

## Tech Stack
- Node.js
- Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/bharti-kajal/movie-booking-system.git
cd movie-booking-system
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file**

Create a `.env` file in the root directory for enviroment variables

4. **Run the application**

```bash
npm start
```

Server runs on `http://localhost:3200`.

## Project Structure
/src
  /config
  /controllers 
  /middlewares  
  /models  
  /routes  
--.env
--.gitignore
--package.json  
--README.md
--server.js

## API Endpoints

### Auth APIs
1. Register User  
   Method: POST
   Endpoint: POST /api/user/sign-up  
   Example Request Body:
   {
     "name": "Asmita Pritam",
     "email": "asmita@gmail.com",
     "password": "Asmita@123"
   }

2. Login User  
   Method: POST
   Endpoint: /api/user/sign-in  
   Example Request Body:
   {
     "email": "asmita@gmail.com",
     "password": "Asmita@123"
   }

### Movies
Note: All movie endpoints require passing the JWT token in the `Authorization` header as:*  
`Authorization: <your_token>`

1. Add Movie  
   Method: POST
   Endpoint: /api/movie/add  
   Example Request Body:
   {
    "title": "Guillermo del Toro and Neil Gaiman Find Hope",
    "description": "Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope ",
    "duration": "9-hour",
    "genre": "1997"
  }

2. Update Movie  
   Method: POST
   Endpoint: /api/movie/update  
   Example Request Body:
   {
     "title": "Demo Test",
    "description": "Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope Guillermo del Toro and Neil Gaiman Find Hope ",
    "duration": "12-hour",
    "genre": "1998",
    "movieId": "68468165389d0378d34cfc2c"
  }

3. Delete Movie
   Method: POST
   Endpoint: /api/movie/delete  
   Example Request Body:
   {
    "movieId": "68468165389d0378d34cfc2c"
   } 

4. Movie List
   Method: GET
   Endpoint: /api/movie/lists


### Bookings


1. View User Booking
   Method: GET
   Endpoint: /api/booking/view-users-booking

Note: All add booking endpoints require passing the JWT token in the `Authorization` header as:*  
`Authorization: <your_token>`

2. Add booking  
   Method: POST
   Endpoint: /api/booking/add  
   Example Request Body:
   {
    "userId": "6645dfcd7afcbb001f3d19a1",
    "movieId": "6657b13333f17e1c8832679f",
    "showDate": "2025-06-11",
    "showTime": "18:30",
    "seats": ["B2", "B10", "B4"],
    "totalPrice": 750
  }

## Authentication
* All movie and booking-related routes require JWT token authentication.
* Send JWT token in the `Authorization` header as:
  `Authorization:token>`

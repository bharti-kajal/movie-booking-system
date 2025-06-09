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

### Auth
1.[/api/auth/register](http://localhost:3200/user/sign-up)
2.[/api/auth/login](http://localhost:3200/user/sign-in)

### Movies
1.[/api/movies](http://localhost:3200/movie/add)
2.http://localhost:3200/movie/update
3.http://localhost:3200/movie/delete
4.http://localhost:3200/movie/lists

### Bookings
1.[/api/movies](http://localhost:3200/booking/add)
2.[/api/movies](http://localhost:3200/booking/view-users-booking)

## Authentication
* All movie and booking-related routes require JWT token authentication.
* Send JWT token in the `Authorization` header as:
  `Authorization:token>`

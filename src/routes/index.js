import express from "express"; // import express
import UserController from "../controllers/user.controller.js"; // import user controller
import MovieController from "../controllers/movie.controller.js"; // import moview controller
import BookingController from "../controllers/booking.controller.js"; // import booking
import Auth from "../middlewares/auth.middleware.js"; // import Auth middleware

import {
  validateUserSignUp,
  validateUserLogin,
} from "../middlewares/user.validation.middleware.js";
import {
  validateAddMovie,
  validateUpdateMovie,
  validateDeleteMovie,
} from "../middlewares/movie.validation.middleware.js";
import {
  validateAdd
} from "../middlewares/booking.validation.middleware.js";

const router = express.Router();
const userController = new UserController();
const movieController = new MovieController();
const bookingController = new BookingController();

// 1. User signup
router.post("/user/sign-up", validateUserSignUp, (req, res) => {
  userController.signUp(req, res);
});

// 2. User Login
router.post("/user/sign-in", validateUserLogin, (req, res) => {
  userController.login(req, res);
});

// 1. Add Movie
router.post("/movie/add", Auth, validateAddMovie, (req, res) => {
  movieController.add(req, res);
});

// 2. Update movie
router.post("/movie/update", Auth, validateUpdateMovie, (req, res) => {
  movieController.update(req, res);
});

// 3. Lists Of Movies
router.get("/movie/lists", Auth, (req, res) => {
  movieController.lists(req, res);
});

// 4. Delete movie
router.post("/movie/delete", Auth, validateDeleteMovie, (req, res) => {
  movieController.delete(req, res);
});

// 1. Add Booking
router.post("/booking/add", Auth, validateAdd, (req, res) => {
  bookingController.booking(req, res);
});

// Show Booked Users
router.get("/booking/view-users-booking", Auth, (req, res) => {
  bookingController.viewUsersbooking(req, res);
});

export default router; // export routes

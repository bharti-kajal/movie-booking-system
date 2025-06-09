import CommonRepository from "../models/repository/common.repository.js";
import bookingModel from "../models/schema/booking.schema.js";
class BookingController {

  constructor() {
    this.commonRepository = new CommonRepository();
  }

  async booking(req, res) {

    try {
      let { user, movie, showDate, showTime, seats, totalPrice, status } =
        req.body;

      showDate = new Date(showDate);
      seats = Array.isArray(seats) ? seats : [seats];
      totalPrice = Number(totalPrice);

      //  1. Check for seat already Book
      const alreadyBooking = await bookingModel.findOne({
        movie,
        showDate,
        showTime,
        seats: { $in: seats },
        status: "booked"
      });

      if (alreadyBooking) {
        return res.status(409).json({
          status: false,
          message: `Some selected seats are already booked for this show.`,
          conflictSeats: seats.filter((seat) =>
            alreadyBooking.seats.includes(seat)
          ),
        });
      }

      // 2. Proceed to booking
      const bookingData = {
        user,
        movie,
        showDate,
        showTime,
        seats,
        totalPrice,
        status: status || "booked",
      };

      const result = await this.commonRepository.add(bookingModel, bookingData);

      if (result) {
        return res.status(201).json({
          status: true,
          message: "Booking created successfully!"
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Something went wrong. Booking not created.",
        });
      }
    } catch (err) {
      console.error("Error in booking controller:", err);
      return res.status(500).json({
        status: false,
        message: "Internal server error"
      });
    }
  }

  // View Users Booking
  async viewUsersbooking(req, res) {
    try {
      const result = await this.commonRepository.usersBooking(bookingModel);
      if (result) {
        res.status(200).json({ status: true, booked_users: result });
      } else {
        res
          .status(400)
          .json({ status: false, message: "Something went wrong" });
      }
    } catch (err) {
       return res
        .status(500)
        .json({ status: false, message: "Internal server error" });
    }
  }
}

export default BookingController;

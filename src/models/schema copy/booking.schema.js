import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: [true, 'Movie is required']
  },
  showDate: {
  type: Date,
  required: [true, 'Show date is required']
},
showTime: {
  type: String,
  required: [true, 'Show time is required']
},
   seats: {
    type: [String],
    required: [true, 'Seats must be selected'],
    validate: {
      validator: function (v) {
        return Array.isArray(v) && v.length > 0;
      },
      message: 'At least one seat must be selected'
    }
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Price must be positive']
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked'
  }
}, { timestamps: true });

const bookingModel = mongoose.model('Booking', bookingSchema);
export default bookingModel;

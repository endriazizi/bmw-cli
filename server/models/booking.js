const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  startAt: {
    type: Date,
    rquired: 'Started date is required'
  },
  endAt: {
    type: Date,
    rquired: 'Ending date is required'
  },
  totalPrice: Number,
  guests: Number,
  createdAt: {
    type: Date,
    default: Date.now
  },

  // External Keys
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rental: {
    type: Schema.Types.ObjectId,
    ref: 'Rental'
  },

});

module.exports = mongoose.model("Booking", bookingSchema);

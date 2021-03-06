const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, 'Too long, max is 128 characters']
  },
  city: {
    type: String,
    lowercase: true,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  category: {
    type: String,
    lowercase: true
  },
  image: {
    type: String,
    required: true
  },
  bedrooms: Number,
  description: {
    type: String,
    required: true
  },
  dailyRate: Number,
  shared: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  },

  // External Keys
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

module.exports = mongoose.model("Rental", rentalSchema);

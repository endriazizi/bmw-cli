const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');
const {
  normalizeErrors
} = require('../helpers/mongoose');

const moment = require('moment');

exports.createBooking = function(req, res) {

  const {
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    rental
  } = req.body;
  // We are creating Booking just localy in memory we are not saving it DB yet
  const user = res.locals.user;

  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    rental
  });

  console.log(booking);

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }
      if (foundRental.user.id === user.id) {
        return res.status(422).send({
          errors: [{
            title: 'Invalid User',
            detail: 'Cannot create booking on your rental!'
          }]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user; // getting from const user = res.locals.user;
        booking.rental = foundRental;
        // update rental
        foundRental.bookings.push(booking);

        booking.save(function(err) {
          if (err) {
            return res.status(422).send({
              errors: normalizeErrors(err.errors)
            });
          }

          foundRental.save();

          // update user
          User.update({
            _id: user.id
          }, {
            $push: {
              bookings: booking
            }
          }, function() {});
          return res.json({
            startAt: booking.startAt,
            endAt: booking.endAt
          });
        });

      } else {
        return res.status(422).send({
          errors: [{
            title: 'Invalid Booking',
            detail: 'Choosen date are already taken!'
          }]
        });
      }
      /*       // Check here for a valid booking
            return res.json({
              booking,
              foundRental
            }); */
    });

  function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {
      isValid = rental.bookings.every(function(booking) {

        const proposedStart = moment(proposedBooking.startAt);
        const proposedEnd = moment(proposedBooking.endAt);

        const actualStart = moment(booking.startAt);
        const actualEnd = moment(booking.endAt);
        return ((actualStart < proposedStart && actualEnd < proposedEnd) || (proposedEnd < actualEnd && proposedEnd < actualStart))
      });
    }
    return isValid;
  }


  /*   res.json({
      'createBooking': 'ok'
    }); */
}

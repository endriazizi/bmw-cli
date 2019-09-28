const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const {
  normalizeErrors
} = require('../helpers/mongoose');

const UserCtrl = require('../controllers/user');

/* router.get('', (req, res) => {
  res.json({
    'ok': true
  });
}) */




router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({
    "secret": true
  });
});

router.post('', UserCtrl.authMiddleware, (req, res) => {
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;

  // const user = res.locals.user;
  const user = res.locals.user;

  console.log('USER QUIII', res.locals.user);

  // inizializzo un nuovo rental
  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });

  // rental.user = user;
  rental.user = user;

  console.log('USER ID', user.id);

  Rental.create(rental, (err, newRental) => {
    if (err) {
      console.log('fileterRentals ERROR CASE', err)
      return res.status(422).send({
        errors: normalizeErrors(err.errors)
      });
    }

    /*     User.update({
          _id: user.id
        }, {
          $push: {
            rentals: newRental // rentals[] from User model
          }
        }); */


    User.update({
      _id: user.id
    }, {
      $push: {
        rentals: newRental
      }
    }, function() {}); // call back function, empty body


    return res.json(newRental);
  });

});




// search implementation to check out https://www.youtube.com/watch?v=9_lKMTXVk64&t=772s
router.get('', UserCtrl.authMiddleware, (req, res) => {

  const city = req.query.city;

  // Thernary operation for checking out get route
  const query = city ? {
    city: city.toLowerCase()
  } : {};

  Rental.find(query)
    .select('-bookings') // don't want to include bookings to the response
    .exec(function(err, fileterRentals) {
      console.log('fileterRentals START', fileterRentals)

      if (err) {
        console.log('fileterRentals ERROR CASE', err)
        return res.status(422).send({
          errors: normalizeErrors(err.errors)
        });
      }

      // if fileterRentals is Empty
      if (fileterRentals.length === 0) {
        console.log('fileterRentals EMPTY CASE', fileterRentals)
        return res.status(422).send({
          errors: [
            // see string interpolation ${city}
            // title: 'No Rental Found!', detail: `There are no rentals for city` + city
            {
              title: 'No Rentals Found!',
              detail: `There are no rentals for city ${city}`
            }
          ]
        });
      }

      return res.json(fileterRentals);

    })

});






router.get('/:id', (req, res) => {
  const rentalId = req.params.id;
  console.log('ID : \n', rentalId);
  Rental.findById(rentalId)
    .populate('user', 'username -_id')
    .populate('bookings', 'startAt endAt -_id')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({
          errors: [{
            title: 'Rental Error!',
            detail: 'Could not find Rental!'
          }]
        });
      }

      console.log('ID : \n', foundRental);
      return res.json(foundRental);
    });

  /*
  // Old Version
    Rental.findById(rentalId, (err, foundRental) => {
      if (err) {
        res.status(422).send({
          errors: [{
            title: 'Rental Error!',
            detail: 'Could not find Rental!'
          }]
        });
      }
      console.log('ID : \n', foundRental);
      res.json(foundRental);
    }) */
});

module.exports = router;

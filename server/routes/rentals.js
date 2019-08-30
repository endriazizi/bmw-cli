const express = require('express');
const router = express.Router();
const Rental = require('../models/rental')

/* router.get('', (req, res) => {
  res.json({
    'ok': true
  });
}) */


const UserCtrl = require('../controllers/user');

router.get('/secret', UserCtrl.authMiddleware, function(req, res) {
  res.json({
    "secret": true
  });
});

router.get('', (req, res) => {
  Rental.find({}, (err, foundRentals) => {
    res.json(foundRentals);
  })
});

router.get('/:id', (req, res) => {
  const rentalId = req.params.id;
  console.log('ID : \n', rentalId)
  Rental.findById(rentalId, (err, foundRental) => {
    if (err) {
      res.status(422).send({
        errors: [{
          title: 'Rental Error!',
          detail: 'Could not find Rental!'
        }]
      });
    }
    console.log('ID : \n', foundRental)
    res.json(foundRental);
  })
});

module.exports = router;

const express = require('express');
const router = express.Router();


const User = require('../controllers/user');
const UserModel = require('../models/user');

/* router.get('', (req, res) => {
  res.json({
    'ok': true
  });
}) */

router.post('/auth', User.auth);

router.post('/register', User.register);

router.get('', (req, res) => {
  UserModel.find({}, (err, foundUsers) => {
    res.json(foundUsers);
  })
});


router.delete('/:id', function(req, res) {
  UserModel.deleteOne({
    _id: req.params.id,
  }, function(err) {
    if (err)
      return console.error(err);
  });

  console.log('User successfully removed from polls collection!');
  res.status(200).send({
    message: 'User successfully removed from polls collection!'
  });

});

module.exports = router;

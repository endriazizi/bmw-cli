const express = require('express');
const router = express.Router();


var async = require("async");
var nodemailer = require("nodemailer");
var crypto = require("crypto");


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

// forgot password
router.get('/forgot', (req, res) => {
  res.json('forgot');
});

// https://stackoverflow.com/questions/27676936/does-res-end-ends-async-waterfall
router.post('/forgot', function(req, res, next) {
  async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
          console.log('UNO');
        });
      },
      function(token, done) {
        UserModel.findOne({
          email: req.body.email
        }, function(err, user) {
          if (!user) {
            console.log('user not avaible');
            // req.flash('error', 'No account with that email address exists.');
            // return res.redirect('/forgot');
            res.status(200).send('Some message').end();
            console.log('DUE');
          }

          user.resetPasswordToken = token;
          console.log('user.resetPasswordToken: ', user.resetPasswordToken);
          console.log('user.resetPasswordToken: ', req.body.email);
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
            console.log('TRE');
          });
        });

      },

      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          //service: 'Gmail',
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: 'endri.azizi@gmail.com',
            pass: '@Castelraimondo2019@'
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'endri.azizi@gmail.com',
          subject: 'PROVA Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            // 'http://'+'/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          // req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          res.status(200).send({
            message: 'An e-mail has been sent to ' + user.email + ' with further instructions.'
          }).end();
          done(err, 'done');
          console.log('QUATTRO');
        });
        console.log('email sent to: ', user.email);
      }

    ],
    function(err) {
      if (err) return next(err);
      console.log('CINQUE ');
      res.status(200).send('Some message').end();
      // res.redirect('/forgot');
      // res.json({ message: 'mail sent'});


    });
});


router.get('/reset/:token', function(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      token: req.params.token
    });
  });
});



router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if(req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function(err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          })
        } else {
            req.flash("error", "Passwords do not match.");
            return res.redirect('back');
        }
      });
    },
    function(user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'learntocodeinfo@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'learntocodeinfo@mail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function(err) {
    res.redirect('/campgrounds');
  });
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

// --------------------------------------------------------
// Pull in the libraries
// --------------------------------------------------------
const express = require('express');
const config = require('./config/dev');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const FakeDb = require('./models/fake-db')
const rentalRoutes = require('./routes/rentals')
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/booking');


const app = express();

app.use(bodyParser.json());


// --------------------------------------------------------
// CORS
// --------------------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);

//require('dotenv').config();
// console.log(process.env);

// https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
// sudo systemctl status mongodb
mongoose.Promise = global.Promise;
/* mongoose.connect(
    config.DB_URI, {
      useNewUrlParser: true
    }
  ) //.then(() => console.log('Connected to MongoDB...', config.DB_URI))
  .then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));
 */
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true
  }).then(() => console.log('Connected to MongoDB...', config.DB_URI))
  .then(() => {
    const fakeDb = new FakeDb();
    // fakeDb.seeDb();
  })
  .catch(err => console.error('Could not connect to MongoDB...', err));


// --------------------------------------------------------
// Routes
// --------------------------------------------------------

/* app.get('/rentals', (req, res) => {
  res.json({
    "success": true
  });
}); */

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('I am Running on port: ' + PORT);
})

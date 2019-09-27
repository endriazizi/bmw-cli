const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters']
  },
  email: {
    type: String,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    unique: true,
    lowercase: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },

  password: {
    type: String,
    required: true,
    min: [4, 'Too short, min is 4 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required',
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  rentals: [{
    type: Schema.Types.ObjectId,
    ref: 'Rental'
  }],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

userSchema.methods.hasSamePassword = function(requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
}



// userSchema.pre('save', (next) => {
userSchema.pre('save', function(next) {
  const user = this;
  //  const saltRounds = 10;
  // let myPlaintextPassword = user.password
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      // Store hash in your password DB.
      user.password = hash;
      console.log(user.password)
      next();
    });
  });
})


module.exports = mongoose.model("User", userSchema);

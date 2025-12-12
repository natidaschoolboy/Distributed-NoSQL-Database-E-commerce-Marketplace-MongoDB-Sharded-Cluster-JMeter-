const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
  password: String, // assuming you’ll hash this
  bio: String,
  profilePic: String,
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

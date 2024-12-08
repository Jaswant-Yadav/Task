const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  email: String,
  phone: Number
});

module.exports = mongoose.model('User', userSchema);

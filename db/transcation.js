const mongoose = require('mongoose');

// Transactions Schema

mongoose.connect('mongodb://localhost:27017/task');

const transactionsSchema = new mongoose.Schema({
  bookName: String,
  bookId : Number,
  userId: Number,
  issueDate: Number,
  returnDate: Number, // Optional until returned
  rent: Number,        // Calculated upon return
});

// Transactions Model
module.exports = mongoose.model('Transactions', transactionsSchema);

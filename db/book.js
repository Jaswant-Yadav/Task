const mongoose = require('mongoose');

// connect DB

mongoose.connect('mongodb://localhost:27017/task');
const bookSchema = new mongoose.Schema({
    bookId : Number,
    name: String,
    category: String,
    rentPerDay: Number,
});

module.exports = mongoose.model('Book', bookSchema);


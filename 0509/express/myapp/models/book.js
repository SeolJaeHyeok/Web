const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const book = new Schema({
  bookName: String,
  author: String,
  price: Number,
  publish: Date,
});

const bookData = mongoose.model("book", book);

module.exports = bookData;

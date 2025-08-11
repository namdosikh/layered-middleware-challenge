const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  text: String,
  timestamp: Date,
});

module.exports = mongoose.model('Post', postSchema);

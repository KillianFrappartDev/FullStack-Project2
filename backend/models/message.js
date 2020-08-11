const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  message: { type: String, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Message', schema);

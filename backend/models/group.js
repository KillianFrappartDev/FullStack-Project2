const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  tag: { type: String, requires: true },
  description: { type: String, required: true },
  members: [{ type: mongoose.Types.ObjectId, required: true, ref: 'User' }],
  messages: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Message' }],
});

module.exports = mongoose.model('Group', schema);

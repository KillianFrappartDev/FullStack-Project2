const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  groups: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Group' }],
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);

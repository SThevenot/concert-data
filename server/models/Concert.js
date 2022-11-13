const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const concertSchema = new Schema({
  concertDescription: {
    type: String,
    required: 'You need to leave a Concert!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  concertAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  concertArtist: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Concert = model('Concert', concertSchema);

module.exports = Concert;

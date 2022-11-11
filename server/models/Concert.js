/** @format */

const { Schema, model } = require("mongoose");

const concertSchema = new Schema({
  notes: {
    type: String,
    required: true,
  },
});

module.exports = concertSchema;

'use strict';

const mongoose = require('mongoose');

let projectSchema = new mongoose.Schema({
  title:   {
    type: String,
    required: "Title not found"
  },
  created: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('Project', projectSchema);

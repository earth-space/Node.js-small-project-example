// Todo Schema
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TodoTask', todoTaskSchema);
// Todo Schema
const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('TodoTask', todoTaskSchema);
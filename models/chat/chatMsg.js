// Chat Message Schema
const mongoose = require('mongoose');
const chatMsgSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
      type: String,
      required: true
  }
});

module.exports = mongoose.model('ChatMsg', chatMsgSchema);
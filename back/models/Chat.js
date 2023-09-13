const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

exports.chatSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  conversation: [conversationSchema],
  title: { type: String, default: 'New Chat' },
  createdAt: {
    type: Number,
    default: new Date().getTime()
  },
  updateAt: {
    type: Number,
    default: new Date().getTime()
  }
});

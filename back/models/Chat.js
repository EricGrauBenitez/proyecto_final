const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  conversation: [conversationSchema],
  createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;

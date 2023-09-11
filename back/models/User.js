const { chatSchema } = require('./Chat')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  city: {type: String, required: false, default: ''},
  country: {type: String, required: false, default: ''},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ['user', 'admin'], default: 'user'},
  chats: {
    type: [chatSchema],
  },
  token: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;


/*

{
  name: "Manolo",
  lastName: "El Peluka",
  email: "xuapala@gmail.com",
  role: "user",
  chats: [
    {
      conversation: [],
      title: "New chat",
      createdAt: new Date().getTime()
    }
  ]
}

*/


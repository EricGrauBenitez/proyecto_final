const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    expires: 3600, 
  },
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

module.exports = ResetToken;

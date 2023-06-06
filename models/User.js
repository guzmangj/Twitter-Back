const { mongoose, Schema } = require("../db");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 120,
  },
  image: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [mongoose.Schema.Types.ObjectId],
  following: [mongoose.Schema.Types.ObjectId],
});

const User = mongoose.model("User", userSchema);

module.exports = User;

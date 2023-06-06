const { mongoose, Schema } = require("../db");
const mongoosePaginate = require("mongoose-paginate-v2");

// Crear esquema y modelo User...
const tweetSchema = new Schema({
  content: {
    type: String,
    maxlength: 140,
  },
  likes: [],
  date: Date,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
tweetSchema.plugin(mongoosePaginate);
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;

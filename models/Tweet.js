const { mongoose, Schema } = require("../db");
const mongoosePaginate = require("mongoose-paginate-v2");

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

tweetSchema.methods.toJSON = function () {
  const tweet = this.toObject();
  tweet.id = tweet._id.toString();
  delete tweet._id;
  return tweet;
};

tweetSchema.plugin(mongoosePaginate);
const Tweet = mongoose.model("Tweet", tweetSchema);
module.exports = Tweet;

const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use("/", userRoutes);
  app.use("/", authRoutes);
  app.use("/", tweetRoutes);
};

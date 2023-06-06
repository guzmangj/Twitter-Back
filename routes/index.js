const userRoutes = require("./userRoutes");
const tweetRoutes = require("./tweetRoutes");
const loginRoutes = require("./loginRoutes");

module.exports = (app) => {
  app.use("/", userRoutes);
  app.use("/", loginRoutes);
  app.use("/", tweetRoutes);
};

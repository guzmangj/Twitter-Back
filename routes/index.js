const userRoutes = require("./userRoutes");

const tweetRoutes = require("./tweetRoutes");

module.exports = (app) => {
  app.use("/usuarios", userRoutes);
  //token routes
  app.use("/", tweetRoutes);
};

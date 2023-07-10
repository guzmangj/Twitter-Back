const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  await User.deleteMany();
  const users = [];

  for (let i = 0; i < 30; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash("123456", 5),
      image: faker.image.avatar(),
      description: faker.lorem.sentence().slice(0, 120),
      following: [],
      followers: [],
    });
  }
  await User.insertMany(users);

  console.log("Se crearon los usuarios.");

  const allUsers = await User.find({});
  for (const user of allUsers) {
    const followers = await fakeFollowers();
    for (const follower of followers) {
      user.followers.push(follower);
      follower.following.push(user);
      await follower.save();
    }
    await user.save();
  }

  console.log("Se asignaron los seguidores a los usuarios.");
  console.log("[Database] Se corrió el seeder de Users.");
};
async function fakeFollowers() {
  const followersQuantity = Math.floor(Math.random() * 30);
  const followers = await User.find({}).skip(followersQuantity);
  return followers;
}

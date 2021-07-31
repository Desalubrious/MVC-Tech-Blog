const { User } = require('../models');

const userData = [
  {
    username: "Evan",
    email: "Evan@gmail.com",
    password: "password1234"
  },
  {
    username: "James",
    email: "James@gmail.com",
    password: "password1234"
  },
  {
    username: "Matt",
    email: "Matt@gmail.com",
    password: "password1234"
  },
  {
    username: "Luna",
    email: "Luna@gmail.com",
    password: "password1234"
  },
  {
    username: "Kevin",
    email: "Kevin@gmail.com",
    password: "password1234"
  }
];

const seedUsers = () => User.bulkCreate(userData);
module.exports = seedUsers;
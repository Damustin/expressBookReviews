const express = require('express');
const jwt = require('jsonwebtoken');
let users = {};

const isValid = (username) => {
  //write code to check if the username is valid
  // ...
}

const authenticatedUser = (username, password) => {
  //write code to check if username and password match the one we have in records.
  // ...
}

const regd_users = express.Router();

regd_users.post("/login", (req, res) => {
  //Write your code here
  // ...
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  // ...
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;


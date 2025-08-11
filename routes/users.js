var express = require("express");
var router = express.Router();

const users = require("../data/users");

// GET /users - return all users
router.get("/", (req, res, next) => {
  let result = users;
  res.json(result);
});

module.exports = router;

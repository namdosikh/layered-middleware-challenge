var express = require('express');
var router = express.Router();

const users = require('../data/users');

// GET users listing 
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

// GET /users - return all users
router.get('/', (req, res, next) => {
    let result = users;
    res.json(result); 
});

module.exports = router;
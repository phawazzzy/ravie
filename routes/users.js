var express = require('express');
const { signUp } = require('../controllers/usersController');
var router = express.Router();

/* GET users listing. */
router.get('/register', signUp);

module.exports = router;

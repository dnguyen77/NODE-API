const router = require('express').Router();
const userCtrl = require('../controllers/User.Controller');

//User Registration Route
router.post('/register', userCtrl.registerUser);

//Login Route
router.post('/login', userCtrl.login);

module.exports = router;
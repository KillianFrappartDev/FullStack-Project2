const express = require('express');
const { check } = require('express-validator');

const controllers = require('../controllers/users-controllers');

const router = express.Router();

router.post('/login', controllers.login);

router.post(
  '/signup',
  [
    check('username').not().isEmpty(),
    check('image').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  controllers.signup
);

module.exports = router;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/users-model');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed.'));
  }

  if (!user) {
    return next(new Error('[POST][USERS] Login failed (no corresponding email found).'));
  }

  let decodedPassword = false;
  try {
    decodedPassword = await bcrypt.compare(password, user.password);
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed (password is wrong).'));
  }

  let token;
  try {
    token = await jwt.sign({ userId: user.id }, process.env.SECRET);
  } catch (error) {
    return next(new Error('[POST][USERS] Login failed (could not create token).'));
  }

  if (decodedPassword) {
    res.json({
      message: 'User logged in!',
      userId: user.id,
      token,
      username: user.username,
      access: true,
    });
  } else {
    res.json({ message: 'Wrong credentials, try again.', access: false });
  }
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const invalid = validationResult(req);
  if (!invalid.isEmpty()) {
    return next(new Error('[POST][USERS] Invalid inputs.'));
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return next(new Error('[POST][USERS] Could not find existing user.'));
  }

  if (existingUser) {
    return next(new Error('[POST][USERS] An account for the provided Email already exists.'));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    return next(new Error('[POST][USERS] Hashing password failed.'));
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  let token;
  try {
    token = await jwt.sign({ userId: newUser.id }, process.env.SECRET);
  } catch (error) {
    return next(new Error('[POST][USERS] Could not create token'));
  }

  try {
    await newUser.save();
  } catch (error) {
    return next(new Error('[POST][USERS] Could not sign user up.'));
  }

  console.log('[POST][USERS] User signed up!');
  res.json({ message: 'New user signed up!', token, userId: newUser.id, access: true });
};

exports.login = login;
exports.signup = signup;

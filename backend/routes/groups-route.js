const express = require('express');
const { check } = require('express-validator');

const controllers = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/', controllers.getGroups);

router.post('/', controllers.addGroup);

module.exports = router;

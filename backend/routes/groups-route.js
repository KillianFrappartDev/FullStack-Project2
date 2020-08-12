const express = require('express');
const { check } = require('express-validator');

const controllers = require('../controllers/groups-controllers');

const router = express.Router();

router.get('/', controllers.getGroups);

router.post('/', controllers.addGroup);

router.post('/:gid', controllers.addMember);

router.get('/:gid', controllers.getMembers);

module.exports = router;

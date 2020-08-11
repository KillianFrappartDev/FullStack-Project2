const Group = require('../models/group');

const getGroups = async (req, res, next) => {
  let groups;
  try {
    groups = await Group.find();
  } catch (error) {
    return next(new Error('[GET][GROUPS] Could not find any group.'));
  }

  res.json({ groups: groups.map((item) => item.toObject({ getters: true })) });
};

const addGroup = async (req, res, next) => {
  const { name, description, tag } = req.body;

  const newGroup = new Group({
    name,
    description,
    tag,
    members: [],
    messages: [],
  });

  try {
    await newGroup.save();
  } catch (error) {
    return next(new Error('[POST][GROUPS] Could not add group.'));
  }

  res.json({ message: 'Group created!', groupId: newGroup.id });
};

exports.getGroups = getGroups;
exports.addGroup = addGroup;

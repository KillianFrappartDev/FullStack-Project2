const mongoose = require('mongoose');

const Group = require('../models/group');
const User = require('../models/user');

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

const addMember = async (req, res, next) => {
  const groupId = req.params.gid;
  const userId = req.body.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(new Error('[GET][USERS] Could not find user'));
  }

  let groupWithMembers;
  try {
    groupWithMembers = await Group.findById(groupId).populate('members');
  } catch (error) {
    return next(new Error('[GET][GROUPS] Could not find group'));
  }

  const hasMember = groupWithMembers.members.filter((item) => item.id === userId);
  console.log(hasMember);

  if (hasMember.length > 0) {
    res.json({ message: 'Already a member' });
  } else {
    try {
      const sess = await mongoose.startSession();
      sess.startTransaction();
      user.groups.push(groupWithMembers);
      await user.save({ session: sess });
      groupWithMembers.members.push(user);
      await groupWithMembers.save({ session: sess });
      await sess.commitTransaction();
    } catch (error) {
      return next(new Error('[POST][GROUPS] Could not add member.'));
    }
  }
  res.json({ message: 'Member added' });
};

const getMembers = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupWithMembers;
  try {
    groupWithMembers = await Group.findById(groupId).populate('members');
  } catch (error) {
    return next(new Error('[GET][GROUPS] Could not find group'));
  }

  res.json({ members: groupWithMembers.members.map((memb) => memb.toObject({ getters: true })) });
};

exports.getGroups = getGroups;
exports.addGroup = addGroup;
exports.addMember = addMember;
exports.getMembers = getMembers;

const mongoose = require('mongoose');

const Message = require('../models/message');
const Group = require('../models/group');

const addMessage = async (req, res, next) => {
  const { username, image, date, message } = req.body;
  const groupId = req.params.gid;

  let group;
  try {
    group = await Group.findById(groupId);
  } catch (error) {
    return next(new Error('[GET][GROUPS] Could not find any group for provided ID.'));
  }

  const newMessage = new Message({
    username,
    date,
    message,
    image,
    group,
  });

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newMessage.save({ session: sess });
    group.messages.push(newMessage);
    await group.save({ session: sess });
    await sess.commitTransaction();
  } catch (error) {
    return next(new Error('[POST][MESSAGE] Add message failed.'));
  }

  res.json({ message: 'Message added!' });
};

const getMessages = async (req, res, next) => {
  const groupId = req.params.gid;

  let groupWithMessages;
  try {
    groupWithMessages = await Group.findById(groupId).populate('messages');
  } catch (error) {
    return next(new Error('[GET][GROUPS] Could not find any group for provided ID.'));
  }

  res.json({ messages: groupWithMessages.messages.map((msg) => msg.toObject({ getters: true })) });
};

exports.addMessage = addMessage;
exports.getMessages = getMessages;

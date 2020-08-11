const mongoose = require('mongoose');

const Message = require('../models/message');
const Group = require('../models/group');

const addMessage = async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.gid);

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
  });

  try {
    // const sess = mongoose.startSession();
    // await sess.startTransaction();
    await newMessage.save();
    // console.log('MESSAGE SAVED');
    // group.messages.push(newMessage);
    // await group.save({ session: sess });
    // await sess.commitTransaction();
  } catch (error) {
    console.log('FAIL');
    return next(new Error('[POST][MESSAGE] Add message failed.'));
  }

  res.json({ message: 'Message added!' });
};

exports.addMessage = addMessage;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const usersRoute = require('./routes/users-route');
const groupsRoute = require('./routes/groups-route');
const messagesRoute = require('./routes/messages-route');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', usersRoute);
app.use('/api/groups', groupsRoute);
app.use('/api/messages', messagesRoute);

app.use((error, req, res, next) => {
  console.log(error);
  res.json({ message: error.message || 'An unknown error occured.' });
});

mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 5000, () => console.log('Server up and running!'));
  })
  .catch((error) => console.log(error));

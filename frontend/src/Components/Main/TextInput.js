import React, { useState, useContext } from 'react';
import { Grid, Paper, IconButton, InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import AuthContext from '../../Context/auth-context';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    marginRight: 10,
    padding: 15,
  },
  paper: {
    marginTop: '2rem',
    marginBottom: '2rem',
    backgroundColor: '#3C393F',
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: 12,
  },
  input: {
    margin: '0.8rem 0 0.8rem 1rem',
    width: '95%',
  },
}));

const TextInput = (props) => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const authContext = useContext(AuthContext);

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (message.trim().length === 0) {
      return;
    }

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let dateObj = new Date();
    let month = monthNames[dateObj.getMonth()];
    let day = String(dateObj.getDate()).padStart(2, '0');
    let year = dateObj.getFullYear();
    let output = month + '\n' + day + ',' + year;

    const newMessage = {
      username: authContext.username,
      image: authContext.image,
      date: `${output} - ${new Date().getHours()}:${new Date().getMinutes()}`,
      message: message,
    };

    let response;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API}/messages/${authContext.groupId}`,
        newMessage
      );
    } catch (error) {
      console.log('[POST][MESSAGES] Add message failed.');
    }

    console.log(response);
    props.send(newMessage);
    setMessage('');

    try {
      await axios.post(`${process.env.REACT_APP_API}/groups/${authContext.groupId}`, {
        userId: authContext.userId,
      });
    } catch (error) {
      console.log('[POST][GROUPS] Add member failed.');
    }
  };

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <form onSubmit={submitHandler}>
          <Paper className={classes.paper}>
            <InputBase
              value={message}
              onChange={changeHandler}
              className={classes.input}
              placeholder='Type your message here...'
            />
            <IconButton type='submit' className={classes.iconButton} aria-label='menu'>
              <SendIcon />
            </IconButton>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

export default TextInput;

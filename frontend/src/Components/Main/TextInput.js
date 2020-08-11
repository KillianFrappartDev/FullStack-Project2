import React, { useState } from 'react';
import { Grid, Paper, IconButton, InputBase } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core/styles';

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

  const changeHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newMessage = {
      user: {
        name: 'John Smith',
        image: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png',
      },
      date: '05/08 - 7:50pm',
      message: message,
    };

    props.send(newMessage);
    setMessage('');
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
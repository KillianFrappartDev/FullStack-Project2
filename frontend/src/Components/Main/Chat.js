import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Message from './Message';

const useStyles = makeStyles((theme) => ({
  chat: {
    padding: '2rem 6rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '75vh',
  },
}));

const Chat = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.chat} item xs={12} container wrap='nowrap' direction='column'>
      {props.messages.map((msg) => (
        <Message
          key={msg.date}
          username={msg.username}
          image={msg.image}
          date={msg.date}
          message={msg.message}
        />
      ))}
    </Grid>
  );
};

export default Chat;

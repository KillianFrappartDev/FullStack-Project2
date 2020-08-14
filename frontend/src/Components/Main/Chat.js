import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Message from './Message';

const useStyles = makeStyles((theme) => ({
  chat: {
    padding: '2rem 4rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '76vh',
    [theme.breakpoints.down('sm')]: {
      padding: '2rem 0',
    },
  },
}));

const Chat = (props) => {
  const classes = useStyles();

  useEffect(() => {
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }, [props.newMessage]);

  return (
    <Grid
      id='chat'
      className={classes.chat}
      item
      xs={12}
      container
      wrap='nowrap'
      direction='column'>
      {props.messages.map((msg) => (
        <Message
          key={msg.id + Math.random() || Math.random()}
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

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import AuthContext from '../../Context/auth-context';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import Chat from './Chat';
import MainHeader from './MainHeader';
import TextInput from './TextInput';

const useStyles = makeStyles((theme) => ({
  loading: {
    margin: '0 auto 20vh',
    width: '100%',
  },
}));

const MainSide = (props) => {
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(false);
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const fetchMessages = async (gid) => {
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_API}/messages/${gid}`);
    } catch (error) {
      console.log('[GET][MESSAGES] Fetch messages failed.');
    }
    if (!response) {
      return;
    }
    setMessageList(response.data.messages);
    setIsLoading(false);
  };

  let int;
  useEffect(() => {
    int = setInterval(fetchMessages.bind(null, authContext.groupId), 5000);

    return () => {
      clearInterval(int);
    };
  }, [authContext]);

  useEffect(() => {
    setIsLoading(true);
    fetchMessages(authContext.groupId);
  }, [authContext.groupId]);

  const sendHandler = (msg) => {
    setMessageList((prev) => {
      const newList = [...prev];
      newList.push(msg);
      return newList;
    });
    newMessage ? setNewMessage(false) : setNewMessage(true);
  };

  return (
    <React.Fragment>
      <MainHeader hide={props.hide} current={props.current} />
      <Grid item xs={12}>
        {isLoading ? (
          <Grid item xs={12} container direction='row'>
            <CircularProgress className={classes.loading} size={120} color='primary' />
          </Grid>
        ) : (
          <Grid item xs={12}>
            <Chat newMessage={newMessage} messages={messageList} />
          </Grid>
        )}
        <Grid item xs={12}>
          <TextInput send={sendHandler} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MainSide;

import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import AuthContext from '../../Context/auth-context';

import Chat from './Chat';
import MainHeader from './MainHeader';
import TextInput from './TextInput';

const MainSide = (props) => {
  const [messageList, setMessageList] = useState([]);
  const authContext = useContext(AuthContext);

  const fetchMessages = async (gid) => {
    console.log('Fetching');
    let response;
    try {
      response = await axios.get(`${process.env.REACT_APP_API}/messages/${gid}`);
    } catch (error) {
      console.log('[GET][MESSAGES] Fetch messages failed.');
    }
    setMessageList(response.data.messages);
  };

  let int;
  useEffect(() => {
    int = setInterval(fetchMessages.bind(null, authContext.groupId), 5000);

    return () => {
      clearInterval(int);
    };
  }, [authContext]);

  useEffect(() => {
    fetchMessages(authContext.groupId);
  }, [authContext.groupId]);

  const sendHandler = (msg) => {
    setMessageList((prev) => {
      const newList = [...prev];
      newList.push(msg);
      return newList;
    });
  };

  return (
    <React.Fragment>
      <MainHeader hide={props.hide} current={props.current} />
      <Grid item xs={12}>
        <Chat messages={messageList} />
        <TextInput send={sendHandler} />
      </Grid>
    </React.Fragment>
  );
};

export default MainSide;

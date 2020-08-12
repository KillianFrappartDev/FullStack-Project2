import React, { useState, useEffect, useContext } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import AuthContext from '../../Context/auth-context';

import Chat from './Chat';
import MainHeader from './MainHeader';
import TextInput from './TextInput';

const MainSide = (props) => {
  const [messageList, setMessageList] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchMessages = async () => {
      let response;
      try {
        response = await axios.get(`${process.env.REACT_APP_API}/messages/${authContext.groupId}`);
      } catch (error) {
        console.log('[GET][MESSAGES] Fetch messages failed.');
      }
      console.log(response.data);
      setMessageList(response.data.messages);
    };
    fetchMessages();
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
      <MainHeader current={props.current} />
      <Grid item xs={12}>
        <Chat messages={messageList} />
        <TextInput send={sendHandler} />
      </Grid>
    </React.Fragment>
  );
};

export default MainSide;

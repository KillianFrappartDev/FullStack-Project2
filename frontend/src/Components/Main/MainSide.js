import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import Chat from './Chat';
import MainHeader from './MainHeader';
import TextInput from './TextInput';

const DUMMY_MESSAGES = [
  {
    user: {
      name: 'John Smith',
      image: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png',
    },
    date: '05/08 - 7:50pm',
    message: 'Hello world!',
  },
  {
    user: {
      name: 'Mary Miller',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjtU6G7eH3COAumnAB34AoGQG2RIOx4O7NnQ&usqp=CAU',
    },
    date: '05/08 - 8:50pm',
    message: 'How are you today?',
  },
  {
    user: {
      name: 'John Smith',
      image: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png',
    },
    date: '05/08 - 8:55pm',
    message: 'Great :)',
  },
];

const MainSide = (props) => {
  const [messageList, setMessageList] = useState(DUMMY_MESSAGES);

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

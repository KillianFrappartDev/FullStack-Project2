import React, { useState } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import GroupSide from '../Components/Side/GroupSide';
import MainSide from '../Components/Main/MainSide';
import MemberSide from '../Components/Side/MemberSide';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
  },
  side: {
    backgroundColor: '#120F13',
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  main: {
    minHeight: '100vh',
    maxHeight: '100vh',
  },
}));

const DUMMY_GROUPS = [
  {
    id: 'g1',
    name: 'WELCOME CHANNEL',
    tag: 'WE',
    description: 'Welcome description here!',
  },
  {
    id: 'g2',
    name: 'FRONTEND',
    tag: 'FR',
    description: 'Frontend description here!',
  },
  {
    id: 'g3',
    name: 'BACKEND',
    tag: 'BA',
    description: 'Backend description here!',
  },
];

const MainPage = () => {
  const [memberMode, setMemberMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [groupList, setGroupList] = useState(DUMMY_GROUPS);
  const [currentGroup, setCurrentGroup] = useState({
    id: 'g1',
    name: 'WELCOME CHANNEL',
    tag: 'WE',
    description: 'Welcome description here!',
  });
  const classes = useStyles();

  const switchHandler = (id) => {
    memberMode ? setMemberMode(false) : setMemberMode(true);
    const selectedGroup = groupList.filter((item) => item.id === id);
    console.log(selectedGroup);
    if (selectedGroup.length > 0) {
      setCurrentGroup(selectedGroup[0]);
    }
  };

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container alignContent='flex-start' alignItems='flex-start'>
          <Grid
            item
            sm={5}
            md={4}
            lg={3}
            wrap='nowrap'
            className={classes.side}
            container
            direction='column'
            justify='space-between'>
            {memberMode ? (
              <MemberSide current={currentGroup} switch={switchHandler} />
            ) : (
              <GroupSide
                openModal={openHandler}
                closeModal={closeHandler}
                open={isOpen}
                groups={groupList}
                switch={switchHandler}
              />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={8}
            lg={9}
            className={classes.main}
            container
            wrap='nowrap'
            direction='column'
            justify='space-between'>
            <MainSide current={currentGroup} />
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
};

export default MainPage;

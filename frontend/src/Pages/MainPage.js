import React, { useState, useEffect } from 'react';
import { Grid, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

const MainPage = () => {
  const [memberMode, setMemberMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const getGroups = async () => {
      let response;
      try {
        response = await axios.get(`${process.env.REACT_APP_API}/groups`);
      } catch (error) {
        console.log('[GET][GROUPS] Could not fetch groups.');
      }
      setGroupList(response.data.groups);
      setCurrentGroup(response.data.groups[0]);
    };
    getGroups();
  }, []);

  const switchHandler = (id) => {
    memberMode ? setMemberMode(false) : setMemberMode(true);
    const selectedGroup = groupList.filter((item) => item.id === id);
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

  const addGroupHandler = (item) => {
    setGroupList((prev) => {
      const newList = [...prev];
      newList.push(item);
      return newList;
    });
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
                addGroup={addGroupHandler}
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

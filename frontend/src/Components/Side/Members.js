import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import AuthContext from '../../Context/auth-context';
import Member from '../Side/Member';

let topEl;
let bottomEl;
let height;

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    margin: '3rem 0 1rem 0',
    padding: '0 1.5rem',
  },
  loading: {
    margin: '5rem auto 0',
  },
  members: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: height || '48vh',
  },
}));

function Members() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [memberList, setMemberList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    topEl = document.getElementById('test-top');
    if (topEl) {
      console.log(topEl.getBoundingClientRect().top);
    }

    bottomEl = document.getElementById('test-bottom');
    if (bottomEl) {
      console.log(bottomEl.getBoundingClientRect().top);
    }

    if (topEl && bottomEl) {
      height = bottomEl.getBoundingClientRect().top - topEl.getBoundingClientRect().top - 50;
      console.log(height);
    }
  }, [height]);

  useEffect(() => {
    setIsLoading(true);
    const fetchMembers = async () => {
      let response;
      try {
        response = await axios.get(`${process.env.REACT_APP_API}/groups/${authContext.groupId}`);
      } catch (error) {
        console.log('[GET][GROUPS] Fetch members failed.');
      }
      if (!response) {
        return;
      }
      setMemberList(response.data.members);
      setIsLoading(false);
    };
    fetchMembers();
  }, [authContext.groupId]);

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} wrap='nowrap' container direction='column'>
        <Grid item xs={12}>
          <Typography id='test-top' className={classes.title} variant='h5'>
            MEMBERS
          </Typography>
        </Grid>
        <Grid className={classes.members} wrap='nowrap' item xs={12} container direction='column'>
          {isLoading ? (
            <CircularProgress className={classes.loading} size={80} color='primary' />
          ) : (
            memberList.map((user) => (
              <Member key={user.id} name={user.username} image={user.image} />
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Members;

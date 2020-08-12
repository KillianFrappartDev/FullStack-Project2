import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import AuthContext from '../../Context/auth-context';
import Member from '../Side/Member';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    margin: '3rem 0 1rem 0',
    padding: '0 1.5rem',
  },
}));

function Members() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const [memberList, setMemberList] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      let response;
      try {
        response = await axios.get(`${process.env.REACT_APP_API}/groups/${authContext.groupId}`);
      } catch (error) {
        console.log('[GET][GROUPS] Fetch members failed.');
      }
      setMemberList(response.data.members);
    };
    fetchMembers();
  }, [authContext.groupId]);

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} container direction='column'>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h5'>
            MEMBERS
          </Typography>
        </Grid>
        {memberList.map((user) => (
          <Member key={user.id} name={user.username} image={user.image} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Members;

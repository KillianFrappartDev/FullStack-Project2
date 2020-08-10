import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} container direction='column'>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h5'>
            MEMBERS
          </Typography>
        </Grid>
        <Member />
        <Member />
        <Member />
      </Grid>
    </Grid>
  );
}

export default Members;

import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  groupName: {
    padding: '1rem 0',
    fontWeight: 'bold',
  },
}));

function MainHeader() {
  const classes = useStyles();

  return (
    <Grid className={classes.header} item container xs={12} direction='row'>
      <Grid item xs={1}></Grid>
      <Grid item xs={11}>
        <Typography className={classes.groupName} variant='h5'>
          FRONT-END DEVELOPERS
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MainHeader;

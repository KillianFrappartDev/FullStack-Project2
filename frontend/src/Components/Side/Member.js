import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  member: {
    padding: '0 1.5rem',
  },
  media: {
    width: '60%',
    borderRadius: '20%',
    margin: '0.8rem 0',
  },
  name: {
    marginLeft: '1rem',
    color: '#828282',
  },
}));

function Member() {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid className={classes.member} item xs={12} container direction='column'>
        <Grid item xs={12} container direction='row' alignItems='center'>
          <Grid item xs={3}>
            <img
              className={classes.media}
              src='https://img2.freepng.fr/20180606/xqu/kisspng-businessperson-management-computer-icons-patterson-avatar-man-5b187316bec997.0063361615283289827815.jpg'
            />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.name} variant='h5'>
              John Smith
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Member;

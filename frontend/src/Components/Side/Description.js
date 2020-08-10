import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '2rem',
    padding: '0 1.5rem',
    fontWeight: 'bold',
  },
  text: {
    marginTop: '1.5rem',
    padding: '0 1.5rem',
  },
}));

function Description() {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} container direction='column'>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h5'>
            FRONT-END DEVELOPERS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1' className={classes.text}>
            Lorem Ipsum Su Dolor Sit Amet Lorem Ipsum Su Dolor Sit Amet Lorem Ipsum Su Dolor Sit
            Amet Ipsum Su Dolor Sit Amet Lorem Ipsum Su Dolor Sit Amet
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Description;

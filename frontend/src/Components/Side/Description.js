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

function Description(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} container direction='column'>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h5'>
            {props.current.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6' className={classes.text}>
            {props.current.description}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Description;

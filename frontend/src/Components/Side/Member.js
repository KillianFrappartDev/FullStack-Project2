import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  member: {
    padding: '10px 1.5rem 0',
  },
  media: {
    width: 50,
    height: 55,
    borderRadius: '20%',
    margin: '0.8rem 0',
  },
  name: {
    color: '#828282',
    marginLeft: 20,
  },
}));

function Member(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid className={classes.member} item xs={12} container direction='column'>
        <Grid item xs={12} container direction='row' alignItems='center'>
          <Grid item xs={3}>
            <img className={classes.media} alt='' src={props.image} />
          </Grid>
          <Grid item xs={9}>
            <Typography className={classes.name} variant='h5'>
              {props.name}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Member;

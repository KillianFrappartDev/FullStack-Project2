import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    marginTop: '4rem',
  },
  member: {
    padding: '0 1.5rem',
  },
  media: {
    width: 50,
    borderRadius: '20%',
  },
  name: {
    color: '#828282',
    marginBottom: '1rem',
  },
  date: {
    color: '#828282',
    fontWeight: '300',
    fontStyle: 'italic',
    fontSize: '0.8rem',
    marginTop: 8,
  },
  content: {
    marginLeft: '1rem',
  },
}));

const Message = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.message} item xs={12} container direction='row'>
      <Grid className={classes.member} item xs={12} container direction='column'>
        <Grid item xs={12} container direction='row' alignItems='center'>
          <Grid item xs={1}>
            <img className={classes.media} alt='' src={props.user.image} />
          </Grid>
          <Grid className={classes.content} item xs={10} container direction='column'>
            <Grid item xs={12} container direction='row'>
              <Grid item xs={2}>
                <Typography className={classes.name} variant='h6'>
                  {props.user.name}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography className={classes.date} variant='h6'>
                  {props.date}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body1'>{props.message}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;

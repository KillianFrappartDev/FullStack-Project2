import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  groupName: {
    padding: '1rem 0',
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: '10px',
  },
  button: {
    padding: 8,
  },
}));

function MemberHeader(props) {
  const classes = useStyles();

  return (
    <Grid className={classes.header} item container xs={12} direction='row' alignItems='center'>
      <Grid item xs={2} justify='center' container>
        <IconButton className={classes.button} onClick={props.switch}>
          <ArrowBackIosIcon className={classes.icon} />
        </IconButton>
      </Grid>
      <Grid item xs={10}>
        <Typography className={classes.groupName} variant='h5'>
          All channels
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MemberHeader;

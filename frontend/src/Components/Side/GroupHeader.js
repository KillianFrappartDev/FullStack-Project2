import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  groupName: {
    padding: '1rem 0',
    fontWeight: 'bold',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function GroupHeader() {
  const classes = useStyles();

  return (
    <Grid className={classes.header} item container xs={12} direction='row' alignItems='center'>
      <Grid item xs={2} />
      <Grid item xs={8}>
        <Typography className={classes.groupName} variant='h5'>
          All channels
        </Typography>
      </Grid>
      <Grid item xs={2} container justify='center' alignItems='center'>
        <IconButton aria-label='delete' className={classes.margin}>
          <AddIcon fontSize='large' />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default GroupHeader;

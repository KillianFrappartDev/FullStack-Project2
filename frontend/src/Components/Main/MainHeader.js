import React from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginBottom: '2rem',
  },
  groupName: {
    padding: '1rem 0',
    fontWeight: 'bold',
  },
  menu: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

function MainHeader(props) {
  const classes = useStyles();

  return (
    <Grid className={classes.header} item container xs={12} direction='row'>
      <Grid item xs={2} sm={1} container direction='row' alignItems='center' justify='center'>
        <IconButton onClick={props.hide} className={classes.menu}>
          <MenuIcon fontSize='large' />
        </IconButton>
      </Grid>
      <Grid item xs={10} sm={11}>
        <Typography className={classes.groupName} variant='h5'>
          {props.current.name}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default MainHeader;

import React, { useContext } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';

import AuthContext from '../../Context/auth-context';
import Member from './Member';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0B090C',
  },
  button: {
    marginTop: 10,
  },
}));

function Footer() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  const clickHandler = () => {
    localStorage.removeItem('userData');
    authContext.logout();
  };

  return (
    <Grid className={classes.footer} item xs={12} container direction='row' alignItems='center'>
      <Grid item xs={9}>
        <Member name={authContext.username} image={authContext.image} />
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={clickHandler} className={classes.button}>
          <ExitToAppIcon fontSize='large' className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Footer;

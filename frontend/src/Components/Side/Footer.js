import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import AuthContext from '../../Context/auth-context';
import Member from './Member';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0B090C',
  },
}));

function Footer() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);

  return (
    <Grid className={classes.footer} item xs={12}>
      <Member name={authContext.username} image={authContext.image} />
    </Grid>
  );
}

export default Footer;

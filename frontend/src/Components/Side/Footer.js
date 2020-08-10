import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Member from './Member';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#0B090C',
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <Grid className={classes.footer} item xs={12}>
      <Member />
    </Grid>
  );
}

export default Footer;

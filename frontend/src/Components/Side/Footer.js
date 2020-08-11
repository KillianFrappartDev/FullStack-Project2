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
      <Member
        name='John Smith'
        image='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'
      />
    </Grid>
  );
}

export default Footer;

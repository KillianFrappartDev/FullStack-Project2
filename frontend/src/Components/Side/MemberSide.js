import React from 'react';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './Footer';
import Members from './Members';
import SideHeader from './SideHeader';
import Description from './Description';

const useStyles = makeStyles((theme) => ({}));

function MemberSide() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <SideHeader />
        <Description />
        <Members />
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

export default MemberSide;

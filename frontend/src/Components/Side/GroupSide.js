import React from 'react';
import { Grid } from '@material-ui/core';

import Search from './Search';
import Footer from './Footer';
import GroupHeader from './GroupHeader';
import Groups from './Groups';

function GroupSide(props) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <GroupHeader />
        <Search />
        <Groups groups={props.groups} switch={props.switch} />
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

export default GroupSide;

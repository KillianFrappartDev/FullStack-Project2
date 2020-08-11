import React from 'react';
import { Grid } from '@material-ui/core';

import Search from './Search';
import Footer from './Footer';
import GroupHeader from './GroupHeader';
import Groups from './Groups';
import NewGroup from '../NewGroup';

function GroupSide(props) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <GroupHeader openModal={props.openModal} />
        <Search />
        <Groups groups={props.groups} switch={props.switch} />
        <NewGroup addGroup={props.addGroup} close={props.closeModal} open={props.open} />
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

export default GroupSide;

import React, { useState } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import Search from './Search';
import Footer from './Footer';
import GroupHeader from './GroupHeader';
import Groups from './Groups';
import NewGroup from './NewGroup';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function GroupSide(props) {
  const [success, setSuccess] = useState(false);

  const closeHandler = () => {
    setSuccess(false);
  };

  const openHandler = () => {
    setSuccess(true);
  };

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <GroupHeader openModal={props.openModal} />
        <Search update={props.update} groups={props.initGroups} />
        <Groups groups={props.groups} switch={props.switch} />
        <NewGroup
          success={openHandler}
          addGroup={props.addGroup}
          close={props.closeModal}
          open={props.open}
        />
        <Snackbar autoHideDuration={5000} open={success} onClose={closeHandler}>
          <Alert onClose={closeHandler} severity='success'>
            Successfully created a new group!
          </Alert>
        </Snackbar>
      </Grid>
      <Footer />
    </React.Fragment>
  );
}

export default GroupSide;

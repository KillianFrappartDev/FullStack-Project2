import React from 'react';
import { Grid, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainHeader from '../Components/Main/MainHeader';
import MemberSide from '../Components/Side/MemberSide';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
  },
  side: {
    backgroundColor: '#120F13',
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container alignContent='flex-start' alignItems='flex-start'>
          <Grid
            item
            sm={3}
            wrap='nowrap'
            className={classes.side}
            container
            direction='column'
            justify='space-between'>
            <MemberSide />
          </Grid>
          <Grid item xs={12} sm={9} container wrap='nowrap' direction='column'>
            <MainHeader />
          </Grid>
        </Grid>
      </div>
    </CssBaseline>
  );
};

export default MainPage;

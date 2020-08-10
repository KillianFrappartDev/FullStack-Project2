import React from 'react';
import { Grid, CssBaseline, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainHeader from '../Components/Main/MainHeader';
import SideHeader from '../Components/Side/SideHeader';
import Description from '../Components/Side/Description';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
  },
  side: {
    backgroundColor: '#120F13',
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
          <Grid item sm={3} wrap='nowrap' className={classes.side} container direction='column'>
            <SideHeader />
            <Description />
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

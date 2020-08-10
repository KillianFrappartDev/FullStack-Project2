import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 10,
    marginRight: 20,
  },
  paper: {
    marginTop: '2rem',
    backgroundColor: '#3C393F',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  input: {
    margin: '0.8rem 0',
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <IconButton className={classes.iconButton} aria-label='menu'>
            <SearchIcon />
          </IconButton>
          <InputBase className={classes.input} placeholder='Search' />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Search;

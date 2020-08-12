import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, InputBase, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    padding: 15,
    marginRight: 20,
  },
  paper: {
    marginTop: '2rem',
    backgroundColor: '#3C393F',
    display: 'flex',
    flexWrap: 'nowrap',
    borderRadius: 8,
  },
  input: {
    margin: '0.8rem 0',
  },
}));

const Search = (props) => {
  const [searchValue, setSearchValue] = useState('');
  const classes = useStyles();

  const searchHandler = (e) => {
    setSearchValue(e.target.value);
    const allGroups = props.groups;
    const filteredGroups = allGroups.filter((grp) =>
      grp.name.includes(e.target.value.toUpperCase())
    );
    props.update(filteredGroups);
  };

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={1} />
      <Grid item xs={10}>
        <Paper className={classes.paper}>
          <IconButton className={classes.iconButton} aria-label='menu'>
            <SearchIcon />
          </IconButton>
          <InputBase
            value={searchValue}
            onChange={searchHandler}
            className={classes.input}
            placeholder='Search'
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Search;

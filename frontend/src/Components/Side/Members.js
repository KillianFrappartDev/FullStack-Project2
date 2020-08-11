import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Member from '../Side/Member';

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    margin: '3rem 0 1rem 0',
    padding: '0 1.5rem',
  },
}));

const DUMMY_MEMBERS = [
  {
    name: 'John Smith',
    image: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png',
  },
  {
    name: 'Mary Miller',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSjtU6G7eH3COAumnAB34AoGQG2RIOx4O7NnQ&usqp=CAU',
  },
  {
    name: 'James Matt',
    image: 'https://upload.wikimedia.org/wikipedia/en/7/70/Shawn_Tok_Profile.jpg',
  },
];

function Members() {
  const classes = useStyles();

  return (
    <Grid item xs={12} container direction='row'>
      <Grid item xs={12} container direction='column'>
        <Grid item xs={12}>
          <Typography className={classes.title} variant='h5'>
            MEMBERS
          </Typography>
        </Grid>
        {DUMMY_MEMBERS.map((user) => (
          <Member key={user.name} name={user.name} image={user.image} />
        ))}
      </Grid>
    </Grid>
  );
}

export default Members;

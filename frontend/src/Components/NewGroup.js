import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  input: {
    marginTop: '2rem',
  },
}));

export default function NewGroup(props) {
  const classes = useStyle();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(false);

  const nameHandler = (e) => {
    setName(e.target.value);
    if (e.target.value.trim().length > 0) {
      setError(false);
    }
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setError(true);
      return;
    }

    const newGroup = {
      id: 'g4',
      name: name.toUpperCase(),
      description: description,
      tag: name.charAt(0) + name.charAt(1),
    };

    props.addGroup(newGroup);
    props.close();
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby='form-dialog-title'>
        <form onSubmit={submitHandler}>
          <DialogTitle id='form-dialog-title'>Creat a new group!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In order to create your own chat group, you have to enter a name and a short
              description.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={nameHandler}
              margin='dense'
              id='name'
              label='Name'
              value={name}
              type='text'
              fullWidth
              error={error}
              helperText='Please enter a valid name.'
            />
            <TextField
              className={classes.input}
              onChange={descriptionHandler}
              multiline
              margin='dense'
              id='description'
              label='Description'
              type='text'
              value={description}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.close} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              ADD
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

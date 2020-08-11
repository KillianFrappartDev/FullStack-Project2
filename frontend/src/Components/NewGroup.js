import React from 'react';
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

  return (
    <div>
      <Dialog open={props.open} onClose={props.close} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Creat a new group!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            In order to create your own chat group, you have to enter a name and a short
            description.
          </DialogContentText>
          <TextField autoFocus margin='dense' id='name' label='Name' type='text' fullWidth />
          <TextField
            className={classes.input}
            multiline
            margin='dense'
            id='description'
            label='Description'
            type='text'
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close} color='primary'>
            Cancel
          </Button>
          <Button onClick={props.close} color='primary'>
            ADD
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React, { useReducer } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Killian Frappart
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = {
  email: {
    value: '',
    isValid: true,
  },
  password: {
    value: '',
    isValid: true,
  },
  disabled: true,
  remember: false,
};

const reducer = (state = initialState, action) => {
  const reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

  const check = (input) => {
    if (input.value.trim().length > 0 && input.isValid) {
      return true;
    } else {
      return false;
    }
  };

  switch (action.type) {
    case 'email':
      if (reg.test(action.value) && check(state.password)) {
        return { ...state, email: { value: action.value, isValid: true }, disabled: false };
      } else if (reg.test(action.value)) {
        return { ...state, email: { value: action.value, isValid: true }, disabled: true };
      } else {
        return { ...state, email: { value: action.value, isValid: false }, disabled: true };
      }
    case 'password':
      if (action.value.trim().length > 5 && check(state.email)) {
        return { ...state, password: { value: action.value, isValid: true }, disabled: false };
      } else if (action.value.trim().length > 5) {
        return { ...state, password: { value: action.value, isValid: true }, disabled: true };
      } else {
        return { ...state, password: { value: action.value, isValid: false }, disabled: true };
      }
    case 'remember':
      if (state.remember) {
        return { ...state, remember: false };
      } else {
        return { ...state, remember: true };
      }
    default:
      return { ...state };
  }
};

export default function SignIn(props) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(`Login: ${state.email.value} / ${state.password.value} / ${state.remember}`);
    let response;
    try {
      response = await axios.post(`${process.env.REACT_APP_API}/users/login`, {
        email: state.email.value,
        password: state.password.value,
      });
    } catch (error) {
      console.log('[POST][USERS] Could not log user in.');
    }
    console.log(response);
    return;
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Log in
        </Typography>
        <form onSubmit={submitHandler} className={classes.form} noValidate>
          <TextField
            className='inputs-bg'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            color='primary'
            onChange={(e) => {
              dispatch({ type: e.target.id, value: e.target.value });
            }}
            value={state.email.value}
            error={!state.email.isValid}
            helperText={!state.email.isValid ? 'Email is not valid.' : ''}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            color='primary'
            onChange={(e) => {
              dispatch({ type: e.target.id, value: e.target.value });
            }}
            value={state.password.value}
            error={!state.password.isValid}
            helperText={!state.password.isValid ? 'Email is not valid.' : ''}
          />
          <FormControlLabel
            control={
              <Checkbox
                value={state.remember}
                onChange={(e) => {
                  dispatch({ type: 'remember' });
                }}
                color='primary'
              />
            }
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            disabled={state.disabled}
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={props.switch} href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

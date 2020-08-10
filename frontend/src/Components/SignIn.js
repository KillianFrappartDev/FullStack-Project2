import React, { useReducer, useContext, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';

import AuthContext from '../Context/auth-context';
import EmailDialog from './EmailDialog';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/KillianFrappartDev'>
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
  loading: {
    margin: '3rem auto',
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
  isLoading: false,
  error: false,
  success: false,
  dialog: false,
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
    case 'loading':
      return { ...state, isLoading: state.isLoading ? false : true };
    case 'setError':
      return { ...state, error: true };
    case 'cancelError':
      return { ...state, error: false };
    case 'setSuccess':
      return { ...state, success: true, dialog: false };
    case 'cancelSuccess':
      return { ...state, success: false };
    case 'openDialog':
      return { ...state, dialog: true };
    case 'closeDialog':
      return { ...state, dialog: false };
    default:
      return { ...state };
  }
};

export default function SignIn(props) {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const storedData = localStorage.getItem('userData');

    if (!storedData) {
      return;
    } else {
      const { username, userId, token } = JSON.parse(storedData);
      authContext.login(username, userId, token);
    }
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    dispatch({ type: 'loading' });

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
    if (response.data.access) {
      if (state.remember) {
        localStorage.setItem(
          'userData',
          JSON.stringify({
            userId: response.data.userId,
            token: response.data.token,
            username: response.data.username,
          })
        );
      }
      authContext.login(response.data.username, response.data.userId, response.data.token);
    } else {
      dispatch({ type: 'loading' });
      dispatch({ type: 'setError' });
    }
  };

  return (
    <React.Fragment>
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
                <Link
                  onClick={() => {
                    dispatch({ type: 'openDialog' });
                  }}
                  href='#'
                  variant='body2'>
                  {' '}
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
          {state.isLoading && (
            <Grid container justify='center'>
              <Grid item>
                <CircularProgress className={classes.loading} size={80} color='primary' />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <Snackbar
        autoHideDuration={5000}
        open={state.error}
        onClose={() => {
          dispatch({ type: 'cancelError' });
        }}>
        <Alert
          onClose={() => {
            dispatch({ type: 'cancelError' });
          }}
          severity='error'>
          Wrong credentials, try again.
        </Alert>
      </Snackbar>
      <Snackbar
        autoHideDuration={5000}
        open={state.success}
        onClose={() => {
          dispatch({ type: 'cancelSuccess' });
        }}>
        <Alert
          onClose={() => {
            dispatch({ type: 'cancelSuccess' });
          }}
          severity='success'>
          Password sent to your Email address.
        </Alert>
      </Snackbar>
      <EmailDialog
        open={state.dialog}
        closeDialog={() => {
          dispatch({ type: 'closeDialog' });
        }}
        submitEmail={() => {
          dispatch({ type: 'setSuccess' });
        }}
      />
    </React.Fragment>
  );
}

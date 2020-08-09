import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './Themes/theme';
import AuthPage from './Pages/AuthPage';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/auth' exact>
            <AuthPage />
          </Route>
          <Route path='/' exact>
            <h1>HERE</h1>
          </Route>
          <Redirect to='/auth' />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

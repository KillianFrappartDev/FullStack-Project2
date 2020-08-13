import React, { useState } from 'react';

import SignIn from '../Components/Auth/SignIn';
import SignUp from '../Components/Auth/SignUp';

const AuthPage = () => {
  const [loginMode, setLoginMode] = useState(true);

  const switchHandler = () => {
    loginMode ? setLoginMode(false) : setLoginMode(true);
  };

  return loginMode ? <SignIn switch={switchHandler} /> : <SignUp switch={switchHandler} />;
};

export default AuthPage;

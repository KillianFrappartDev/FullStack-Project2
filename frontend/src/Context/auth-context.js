import { createContext } from 'react';

const AuthContext = createContext({
  isLogged: false,
  token: null,
  username: null,
  userId: null,
  image: null,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

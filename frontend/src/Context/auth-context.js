import { createContext } from 'react';

const AuthContext = createContext({
  isLogged: false,
  token: null,
  username: null,
  userId: null,
  image: null,
  groupId: null,
  setGroup: () => {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;

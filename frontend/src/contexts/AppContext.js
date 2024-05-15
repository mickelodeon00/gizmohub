import { createContext, useReducer } from 'react';
import { decodedToken } from '../utils/docodedToken';

export const AppContext = createContext();

const initialState = {
  user: decodedToken(localStorage.getItem('token')),
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, user: action.payload };
    case 'USER_SIGNOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  const user = decodedToken(localStorage.getItem('token'));

  if (user && user?.expiresAt <= Date.now()) {
    localStorage.removeItem('token');
    dispatch({ type: 'USER_SIGNOUT' });
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

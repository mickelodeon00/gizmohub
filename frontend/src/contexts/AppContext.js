import { createContext, useReducer } from 'react';
import { decodedToken } from '../utils/docodedToken';

export const AppContext = createContext();

const initialState = {
  user: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_SIGNIN':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  const token = localStorage.getItem('token');

  if (Object.keys(state.user).length === 0 && token) {
    const user = decodedToken(token);
    dispatch({ type: 'USER_SIGNIN', payload: user });
  }

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

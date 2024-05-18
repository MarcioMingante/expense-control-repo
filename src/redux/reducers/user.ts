import { AnyAction } from 'redux';
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

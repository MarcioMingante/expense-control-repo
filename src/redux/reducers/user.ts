import { AnyAction } from 'redux';
import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        email: action.payload.email,
      };
    default:
      return state;
  }
};

export default user;

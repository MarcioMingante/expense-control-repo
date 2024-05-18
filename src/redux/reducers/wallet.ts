import { AnyAction } from 'redux';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

export const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  return state;
};

import { AnyAction } from 'redux';
import { ATT_INFO, DELETE_INFO, EDIT_INFO, REQUEST_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case REQUEST_WALLET:
      return {
        ...state,
        currencies: action.payload.currencies,
      };

    case ATT_INFO:
      return {
        ...state,
        expenses: [...state.expenses, action.payload.formInfo],
      };

    case DELETE_INFO:
      return {
        ...state,
        expenses: action.payload.list,
      };

    case EDIT_INFO:
      return {
        ...state,
        expenses: action.payload.editedList,
      };

    default:
      return state;
  }
};

export default wallet;

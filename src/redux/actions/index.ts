import { Dispatch } from 'redux';
import { WalletFormType } from '../../types/types';

export const LOGIN = 'LOGIN';
export const REQUEST_WALLET = 'REQUEST_WALLET';
export const ATT_INFO = 'ATT_INFO';
export const DELETE_INFO = 'DELETE_INFO';

export const login = (email: string) => ({
  type: LOGIN,
  payload: {
    email,
  },
});

export const requestWallet = (currencies: string[]) => ({
  type: REQUEST_WALLET,
  payload: {
    currencies,
  },
});

export const fetchWallet = () => {
  return async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const walletInfo = await response.json();
    const treatedWallet = Object.keys(walletInfo).filter((current) => current !== 'USDT');

    dispatch(requestWallet(treatedWallet));
  };
};

export const attInfo = (formInfo: WalletFormType) => ({
  type: ATT_INFO,
  payload: {
    formInfo,
  },
});

export const deleteInfo = (list: WalletFormType[]) => ({
  type: DELETE_INFO,
  payload: {
    list,
  },
});

export const addInfo = (formInfo: WalletFormType) => {
  return async (dispatch: Dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const walletInfo = await response.json();

    dispatch(attInfo({
      ...formInfo,
      exchangeRates: walletInfo,
    }));
  };
};

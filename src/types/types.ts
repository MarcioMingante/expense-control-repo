type User = {
  email: string
};

type Wallet = {
  currencies: []
  expenses: []
  editor: boolean
  idToEdit: number
};

export type RootReducer = {
  user: User
  wallet: Wallet
};

export type ExchangeRatesType = {
  code: string
  codein: string
  name: string
  high: string
  low: string
  varBid: string
  pctChange: string
  bid: string
  ask: string
  timestamp: string
  create_date: string
};

export type WalletFormType = {
  id: number
  description: string
  tag: string
  value: string
  method: string
  currency: string
  exchangeRates: []
};

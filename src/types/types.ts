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

export type WalletFormType = {
  id: number
  description: string
  tag: string
  value: string
  method: string
  currency: string
  exchangeRates: []
};

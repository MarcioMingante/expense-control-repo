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

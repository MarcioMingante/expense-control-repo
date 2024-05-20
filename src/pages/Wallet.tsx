import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootReducer, WalletFormType } from '../types/types';
import WalletForm from '../components/WalletForm';

function Wallet() {
  const { email } = useSelector((state: RootReducer) => state.user);
  const { expenses } = useSelector((state: RootReducer) => state.wallet);
  const [totalValue, setTotalValue] = useState('');

  useEffect(() => {
    const changeTotalValue = () => {
      const addedValue = expenses
        .map((current: WalletFormType) => {
          const { value, currency } = current;
          const basePrice = current.exchangeRates[currency].ask;

          return Number(value) * Number(basePrice);
        });

      const result = addedValue.reduce((a, b) => a + b, 0);

      return result.toFixed(2);
    };

    setTotalValue(changeTotalValue());
  }, [expenses]);

  return (
    <main>
      <header>
        {/* <img src="" alt="" /> */}

        <label htmlFor="despesas">
          <h2>
            Total de despesas:
          </h2>
          <h2 id="despesas" data-testid="total-field">{totalValue}</h2>
          <h2 data-testid="header-currency-field">BRL</h2>
        </label>

        <h2 data-testid="email-field">{email}</h2>
      </header>

      <WalletForm />
    </main>
  );
}

export default Wallet;

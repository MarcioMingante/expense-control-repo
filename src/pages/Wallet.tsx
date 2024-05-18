import { useSelector } from 'react-redux';
import { RootReducer } from '../types/types';

function Wallet() {
  const { email } = useSelector((state: RootReducer) => state.user);

  return (
    <main>
      <header>
        {/* <img src="" alt="" /> */}

        <h2 data-testid="total-field">Total de despesas: 0</h2>
        <h2 data-testid="header-currency-field">BRL</h2>

        <h2 data-testid="email-field">{email}</h2>
      </header>
    </main>
  );
}

export default Wallet;

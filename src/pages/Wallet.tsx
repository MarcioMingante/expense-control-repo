import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootReducer, WalletFormType } from '../types/types';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import EditItemForm from '../components/EditItemForm';
import { editInfo } from '../redux/actions';

function Wallet() {
  const { email } = useSelector((state: RootReducer) => state.user);
  const { expenses } = useSelector((state: RootReducer) => state.wallet);
  const [totalValue, setTotalValue] = useState('');
  const [editItemId, setEditItemId] = useState(0);
  const [editForm, setEditForm] = useState(false);
  const [newExpensesList, setNewExpenses] = useState([]);
  const dispatch = useDispatch();

  const handleClick = (indexId: number, currentFormInfo: WalletFormType) => {
    const previowsData = expenses;

    previowsData.splice(indexId, 1, currentFormInfo);

    setNewExpenses(previowsData);
    setEditForm(false);
  };

  useEffect(() => {
    dispatch(editInfo(newExpensesList));
  }, [newExpensesList]);

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
  }, [expenses, newExpensesList]);

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

      {editForm === false && (
        <WalletForm />
      )}

      {editForm === true && (
        <EditItemForm
          editItemId={ editItemId }
          setEditForm={ setEditForm }
          handleClick={ handleClick }
        />
      )}

      <Table
        setEditForm={ setEditForm }
        setEditItemId={ setEditItemId }
      />
    </main>
  );
}

export default Wallet;

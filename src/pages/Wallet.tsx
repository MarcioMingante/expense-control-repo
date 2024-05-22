import './wallet.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import trybeLogo from '../imgs/logo Trybe Wallet.svg';
import emailImg from '../imgs/emaiIcon.svg';
import coinsLogo from '../imgs/Moedas.svg';
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
      <div className="addinfo-container">
        <header className="header-container">
          <div className="header-logo-container">
            <img src={ trybeLogo } alt="logo_da_trybe" />
          </div>

          <label className="header-total-value" htmlFor="despesas">
            <img src={ coinsLogo } alt="imagem_de_moedas" />
            <h3>
              Total de despesas:
            </h3>
            <h3 id="despesas" data-testid="total-field">{totalValue}</h3>
            <h3 data-testid="header-currency-field">BRL</h3>
          </label>

          <div className="current-email">
            <img src={ emailImg } alt="imagem_de_perfil" />
            <h3 data-testid="email-field">{email}</h3>
          </div>
        </header>

        {editForm === false && (
          <WalletForm />
        )}

        {editForm === true && (
          <EditItemForm
            editItemId={ editItemId }
            handleClick={ handleClick }
          />
        )}
      </div>

      <Table
        setEditForm={ setEditForm }
        setEditItemId={ setEditItemId }
      />
    </main>
  );
}

export default Wallet;

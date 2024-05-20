import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { RootReducer } from '../types/types';
import { addInfo } from '../redux/actions';

const expenses = {
  id: 0,
  description: '',
  tag: 'Alimentação',
  value: '',
  method: 'Dinheiro',
  currency: 'USD',
};

function WalletForm() {
  const { currencies } = useSelector((state:RootReducer) => state.wallet);
  const [currentForm, setCurrentForm] = useState(expenses);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCurrentForm((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  return (
    <form>
      <div>
        <label htmlFor="description">Descrição da despesa</label>
        <input
          data-testid="description-input"
          type="text"
          name="description"
          id="description"
          onChange={ handleChange }
          value={ currentForm.description }
        />
      </div>

      <div>
        <label htmlFor="tag">Categorias de despesa</label>
        <select
          data-testid="tag-input"
          name="tag"
          id="tag"
          onChange={ handleChange }
          value={ currentForm.tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </div>

      <div>
        <label htmlFor="value">Valor</label>
        <input
          data-testid="value-input"
          type="text"
          name="value"
          id="value"
          onChange={ handleChange }
          value={ currentForm.value }
        />
      </div>

      <div>
        <label htmlFor="method">Método de pagamento</label>
        <select
          data-testid="method-input"
          name="method"
          id="method"
          onChange={ handleChange }
          value={ currentForm.method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </div>

      <div>
        <label htmlFor="currency">Moeda</label>
        <select
          data-testid="currency-input"
          name="currency"
          id="currency"
          onChange={ handleChange }
          value={ currentForm.currency }
        >
          {currencies.map((current) => (
            <option
              key={ String(current) }
              value={ String(current) }
            >
              {`${current}`}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={ () => {
          dispatch(addInfo(currentForm));
          setCurrentForm({
            ...expenses,
            id: currentForm.id + 1,
          });
        } }
      >
        Adicionar despesa
      </button>
    </form>
  );
}

export default WalletForm;

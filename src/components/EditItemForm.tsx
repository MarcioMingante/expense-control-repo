import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootReducer, WalletFormType } from '../types/types';

type EditFormType = {
  editItemId: number
  handleClick: (indexId: number, currentform: WalletFormType) => void
};

function EditItemForm({ editItemId, handleClick }: EditFormType) {
  const { currencies, expenses } = useSelector((state: RootReducer) => state.wallet);

  const currentItem = expenses
    .filter((current: WalletFormType) => current.id === editItemId);

  const [formInfo, setFormInfo] = useState<WalletFormType>({
    id: editItemId,
    description: currentItem[0].description,
    tag: currentItem[0].tag,
    value: currentItem[0].value,
    method: currentItem[0].method,
    currency: currentItem[0].currency,
    exchangeRates: currentItem[0].exchangeRates,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormInfo((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  return (
    <form className="wallet-form">
      <div className="description-tag-container">
        <div className="description-input">
          <label htmlFor="description">Descrição da despesa</label>
          <input
            data-testid="description-input"
            type="text"
            name="description"
            id="description"
            onChange={ handleChange }
            value={ formInfo.description }
          />
        </div>

        <div className="tag-input">
          <label htmlFor="tag">Categorias de despesa</label>
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            onChange={ handleChange }
            value={ formInfo.tag }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
      </div>

      <div className="value-method-currency-container">
        <div className="value-input">
          <label htmlFor="value">Valor</label>
          <input
            data-testid="value-input"
            type="text"
            name="value"
            id="value"
            onChange={ handleChange }
            value={ formInfo.value }
          />
        </div>

        <div className="method-input">
          <label htmlFor="method">Método de pagamento</label>
          <select
            data-testid="method-input"
            name="method"
            id="method"
            onChange={ handleChange }
            value={ formInfo.method }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </div>

        <div className="currency-input">
          <label htmlFor="currency">Moeda</label>
          <select
            data-testid="currency-input"
            name="currency"
            id="currency"
            onChange={ handleChange }
            value={ formInfo.currency }
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
      </div>

      <button
        data-testid="edit-btn"
        type="button"
        onClick={ () => {
          handleClick(editItemId, formInfo);
        } }
      >
        Editar despesa
      </button>
    </form>
  );
}

export default EditItemForm;

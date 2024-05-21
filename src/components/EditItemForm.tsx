import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer, WalletFormType } from '../types/types';
import { editInfo } from '../redux/actions';

type EditFormType = {
  editItemId: number
  setEditForm: Dispatch<SetStateAction<boolean>>
  handleClick: (indexId: number, currentform: WalletFormType) => void
};

function EditItemForm({ editItemId, setEditForm, handleClick }: EditFormType) {
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
  const [newExpensesList, setNewExpenses] = useState(expenses);
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   const previowsData = expenses;

  //   previowsData.splice(editItemId, 1, formInfo);

  //   setNewExpenses(previowsData);

  //   setEditForm(false);
  // };

  // useEffect(() => {
  //   dispatch(editInfo(newExpensesList));
  // }, [newExpensesList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormInfo((prev) => (
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
          value={ formInfo.description }
        />
      </div>

      <div>
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

      <div>
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

      <div>
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

      <div>
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

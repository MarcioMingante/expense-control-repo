import { Dispatch, SetStateAction } from 'react';
import { WalletFormType } from '../types/types';

type TableItemType = {
  item: WalletFormType
  handleDelete: (id: number) => void
  setEditForm: Dispatch<SetStateAction<boolean>>
  setEditItemId: Dispatch<SetStateAction<number>>
};

function TableItem({ item, handleDelete, setEditForm, setEditItemId }: TableItemType) {
  const { id, description, tag, method, value, currency, exchangeRates } = item;

  const result = Number(value) * Number(exchangeRates[currency].ask);
  const roundConvertion = result.toFixed(2);
  const roundCurrencyValue = Number(exchangeRates[currency].ask).toFixed(2);
  const roundValue = Number(value).toFixed(2);

  const handleClick = () => {
    setEditForm(true);
    setEditItemId(id);
  };

  return (
    <tr key={ id }>
      <td>{description}</td>
      <td>{tag}</td>
      <td>{method}</td>
      <td>{roundValue}</td>
      <td>{exchangeRates[currency].name}</td>
      <td>{roundCurrencyValue}</td>
      <td>{ roundConvertion }</td>
      <td>Real</td>
      <td>
        <button
          data-testid="edit-btn"
          onClick={ handleClick }
        >
          Edit
        </button>
        <button
          data-testid="delete-btn"
          onClick={ () => {
            handleDelete(id);
          } }
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TableItem;

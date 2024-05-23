import { Dispatch, SetStateAction } from 'react';
import editLogo from '../imgs/editLogo.svg';
import trashLogo from '../imgs/trashLogo.svg';
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
          className="table-btn"
          data-testid="edit-btn"
          onClick={ handleClick }
        >
          <img src={ editLogo } alt="" />
        </button>
        <button
          className="table-btn"
          data-testid="delete-btn"
          onClick={ () => {
            handleDelete(id);
          } }
        >
          <img src={ trashLogo } alt="" />
        </button>
      </td>
    </tr>
  );
}

export default TableItem;

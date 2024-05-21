import { WalletFormType } from '../types/types';

type TableItemType = {
  item: WalletFormType
  handleDelete: (id: number) => void
};

function TableItem({ item, handleDelete }: TableItemType) {
  const { id, description, tag, method, value, currency, exchangeRates } = item;

  const result = Number(value) * Number(exchangeRates[currency].ask);
  const roundConvertion = result.toFixed(2);
  const roundCurrencyValue = Number(exchangeRates[currency].ask).toFixed(2);
  const roundValue = Number(value).toFixed(2);

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
        <button>
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

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RootReducer, WalletFormType } from '../types/types';
import TableItem from './TableItem';
import { deleteInfo } from '../redux/actions';

type TableType = {
  setEditForm: Dispatch<SetStateAction<boolean>>
  setEditItemId: Dispatch<SetStateAction<number>>
};

function Table({ setEditForm, setEditItemId }: TableType) {
  const { expenses } = useSelector((state: RootReducer) => state.wallet);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const dispatch = useDispatch();

  const handleDelete = (itemId: number) => {
    const newData = expenses.filter((current: WalletFormType) => current.id !== itemId);

    setFilteredExpenses(newData);
  };

  useEffect(() => {
    dispatch(deleteInfo(filteredExpenses));
  }, [filteredExpenses]);

  return (
    <table className="table-container">
      <thead className="table-header-container">
        <tr>
          <th className="table-spacer" scope="col">Descrição</th>
          <th className="table-spacer" scope="col">Tag</th>
          <th className="table-spacer" scope="col">Método de pagamento</th>
          <th className="table-spacer" scope="col">Valor</th>
          <th className="table-spacer" scope="col">Moeda</th>
          <th className="table-spacer" scope="col">Câmbio utilizado</th>
          <th className="table-spacer" scope="col">Valor convertido</th>
          <th className="table-spacer" scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody className="table-body-container">
        {expenses.length > 0 && (
          expenses.map((item: WalletFormType) => (
            <TableItem
              key={ item.id }
              item={ item }
              handleDelete={ handleDelete }
              setEditForm={ setEditForm }
              setEditItemId={ setEditItemId }
            />
          ))
        )}
      </tbody>
    </table>
  );
}

export default Table;

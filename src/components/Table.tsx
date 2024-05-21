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

    console.log(filteredExpenses);
  };

  useEffect(() => {
    dispatch(deleteInfo(filteredExpenses));
  }, [filteredExpenses]);

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Descrição</th>
          <th scope="col">Tag</th>
          <th scope="col">Método de pagamento</th>
          <th scope="col">Valor</th>
          <th scope="col">Moeda</th>
          <th scope="col">Câmbio utilizado</th>
          <th scope="col">Valor convertido</th>
          <th scope="col">Moeda de conversão</th>
          <th scope="col">Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
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

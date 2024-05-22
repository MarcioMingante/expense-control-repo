import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa o componente "Table"', () => {
  test('Testa se é possivel deletar um item da tabela', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId('description-input');
    const valueInput = screen.getByTestId('value-input');
    const addBtn = screen.getByRole('button', { name: /Adicionar despesa/i });

    await userEvent.type(descriptionInput, 'banana');
    await userEvent.type(valueInput, '3');
    await userEvent.click(addBtn);

    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();

    await userEvent.click(deleteBtn);
    expect(deleteBtn).not.toBeInTheDocument();
  });

  test('Testa se é possiver editar um item adicionado anteriormente', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId('description-input');
    const valueInput = screen.getByTestId('value-input');
    const addBtn = screen.getByRole('button', { name: /Adicionar despesa/i });

    await userEvent.type(descriptionInput, 'banana');
    await userEvent.type(valueInput, '3');
    await userEvent.click(addBtn);

    const editBtn = screen.getByTestId('edit-btn');
    expect(editBtn).toBeInTheDocument();

    await userEvent.click(editBtn);

    const confirmEdit = screen.getByRole('button', { name: /editar despesa/i });
    expect(confirmEdit).toBeInTheDocument();
  });
});

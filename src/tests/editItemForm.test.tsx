import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import Wallet from '../pages/Wallet';

describe('Testando componente "EditItemForm"', () => {
  test('Testa a existencia dos inputs para preencher o formulario', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId('description-input');
    await userEvent.type(descriptionInput, 'banana');
    const valueInput = screen.getByTestId('value-input');
    await userEvent.type(valueInput, '3');
    const addBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    await userEvent.click(addBtn);

    const editBtn = screen.getByTestId('edit-btn');
    expect(editBtn).toBeInTheDocument();

    await userEvent.click(editBtn);

    const editDescriptionInput = screen.getByLabelText('Descrição da despesa');
    await userEvent.clear(editDescriptionInput);
    await userEvent.type(editDescriptionInput, 'abacate');
    expect(editDescriptionInput).toHaveValue('abacate');

    await userEvent.click(screen.getByRole('button', { name: /editar despesa/i }));
  });
});

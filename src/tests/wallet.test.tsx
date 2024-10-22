import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Wallet from '../pages/Wallet';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

const descriptionTestId = 'description-input';

describe('Testando pagina de wallet', () => {
  test('Testa se existe um header com o texto "Total de despesas: 0.00 BRL"', () => {
    renderWithRouterAndRedux(<Wallet />);

    const headerText = screen.getByText('Total de despesas:');
    expect(headerText).toBeInTheDocument();

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toHaveTextContent('0.00');

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toHaveTextContent('BRL');
  });

  test('Testa se existe um input de descrição na pagina e se é possivel digitar no mesmo', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionInput = screen.getByTestId(descriptionTestId);
    expect(descriptionInput).toBeInTheDocument();
    await userEvent.click(descriptionInput);
    await userEvent.keyboard('banana');

    expect(descriptionInput).toHaveValue('banana');
  });

  test('Testa se os inputs são limpos após clicar no botão de "adicionar despesa"', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const addButton = screen.getByRole('button');

    const descriptionInput = screen.getByTestId(descriptionTestId);
    const valueInput = screen.getByTestId('value-input');
    await userEvent.type(descriptionInput, 'banana');
    await userEvent.type(valueInput, '3');

    await userEvent.click(addButton);

    expect(descriptionInput).toHaveValue('');
    expect(valueInput).toHaveValue('');
  });

  test('Testa se o valor total é atualizado ao clicar no botão de adicionar despesas', async () => {
    global.fetch = vi.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<Wallet />);

    const addButton = screen.getByRole('button');

    const descriptionInput = screen.getByTestId(descriptionTestId);
    const valueInput = screen.getByTestId('value-input');
    await userEvent.type(descriptionInput, 'banana');
    await userEvent.type(valueInput, '3');

    await userEvent.click(addButton);

    const headerText = screen.getByText('Total de despesas:');
    expect(headerText).toBeInTheDocument();

    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toHaveTextContent('14.26');

    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toHaveTextContent('BRL');
  });
});

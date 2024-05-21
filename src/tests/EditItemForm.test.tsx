import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando componente "EditItemForm"', () => {
  test('Testa a existencia dos inputs para preencher o formulario', async () => {
    renderWithRouterAndRedux(<App />);

    // const emailInput = screen.getByTestId('email-input');
    // await userEvent.type(emailInput, 'teste@teste.com');
    // const passwordInput = screen.getByTestId('password-input');
    // await userEvent.type(passwordInput, '123456');
    // const loginBtn = screen.getByRole('button', { name: /entrar/i });
    // await userEvent.click(loginBtn);

    // const descriptionInput = screen.getByTestId('description-input');
    // await userEvent.type(descriptionInput, 'banana');
    // const valueInput = screen.getByTestId('value-input');
    // await userEvent.type(valueInput, '3');
    // const addBtn = screen.getByRole('button', { name: /Adicionar despesa/i });
    // await userEvent.click(addBtn);

    // const editBtn = screen.getByRole();
  });
});

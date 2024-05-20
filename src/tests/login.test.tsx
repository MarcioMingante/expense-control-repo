import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando pagina de login', () => {
  test('Testa se existem os inputs para efetuar o login', () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Testa se existe um botõ na pagina', () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeInTheDocument();
  });

  test('Testa se o botão pode ser clicado antes que os inputs sejam preenchidos corretamente', async () => {
    renderWithRouterAndRedux(<App />);

    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeDisabled();
  });

  test('Testa se ao clicar no botão com os campos preenchidos o usuario é redirecionado a pagina com path "/carteira"', async () => {
    renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    await userEvent.click(emailInput);
    await userEvent.keyboard('teste@teste.com');

    expect(emailInput).toHaveValue('teste@teste.com');

    const passwordInput = screen.getByTestId('password-input');
    await userEvent.click(passwordInput);
    await userEvent.keyboard('123456');

    expect(passwordInput).toHaveValue('123456');

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeEnabled();
  });
});

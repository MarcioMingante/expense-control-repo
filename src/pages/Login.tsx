import './login.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trybeLogo from '../imgs/logo Trybe Wallet.svg';
import { login } from '../redux/actions';

const initialInfo = {
  email: '',
  password: '',
};

function Login() {
  const [userInfo, setUserInfo] = useState(initialInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => (
      {
        ...prev,
        [e.target.name]: e.target.value,
      }
    ));
  };

  const isCheckInfo = () => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/;

    return (
      !emailRegex.test(userInfo.email)
      || userInfo.password.length < 6
    );
  };

  return (
    <main>
      <form className="login-form" action="submit">
        <img src={ trybeLogo } alt="" />

        <div className="login-inputs-container">
          <input
            data-testid="email-input"
            placeholder="email"
            onChange={ handleChange }
            value={ userInfo.email }
            type="email"
            name="email"
            id="email"
          />
          <input
            data-testid="password-input"
            placeholder="senha"
            onChange={ handleChange }
            value={ userInfo.password }
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          disabled={ isCheckInfo() }
          onClick={ () => {
            dispatch(login(userInfo.email));
            navigate('/carteira');
          } }
          type="button"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

export default Login;

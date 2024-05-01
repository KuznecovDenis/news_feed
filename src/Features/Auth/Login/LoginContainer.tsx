import React, { FC, Reducer, useReducer, useState } from 'react';
import './LoginContainer.css';
import { LoginForm, TLoginField } from '@components/LoginForm/LoginForm';
import { validateEmail } from './utils';
import { useAuthContext } from '../AuthContextProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

type TLoginFormFieldState = Omit<TLoginField, 'onChange'>;
type TAction = { type: 'change' | 'error'; value: string };

function reducer(state: TLoginFormFieldState, action: TAction): TLoginFormFieldState {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        error: false,
        helper: '',
        value: action.value,
      };
    case 'error':
      return {
        ...state,
        error: true,
        helper: action.value,
      };
    default:
      throw new Error();
  }
}

export const LoginContainer: FC = () => {
  const [emailState, dispatchEmail] = useReducer<Reducer<TLoginFormFieldState, TAction>>(reducer, {
    name: 'email',
    value: '',
  });
  const [passwordState, dispatchPassword] = useReducer<Reducer<TLoginFormFieldState, TAction>>(reducer, {
    name: 'password',
    value: '',
  });

  const { loginWithEmailAndPassword } = useAuthContext();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valid = true;
    if (!validateEmail(emailState.value)) {
      dispatchEmail({
        type: 'error',
        value: 'Введите корректный email',
      });
      valid = false;
    }

    if (passwordState.value.length <= 5) {
      dispatchPassword({
        type: 'error',
        value: 'Длинна пароля меньше 6-ти символов',
      });
      valid = false;
    }

    if (valid) {
      loginWithEmailAndPassword(emailState.value, passwordState.value)
        .then(() => {
          navigate(locationState?.from || '/admin');
        })
        .catch(() => {
          setAuthError('Неверный логин или пароль');
        });
    }
  };

  return (
    <div className="login-container">
      {authError && (
        <Typography variant="subtitle2" color="error" sx={{ m: 2 }}>
          {authError}
        </Typography>
      )}
      <LoginForm
        email={{
          ...emailState,
          onChange: (e) => dispatchEmail({ type: 'change', value: e.target.value }),
        }}
        password={{
          ...passwordState,
          onChange: (e) => dispatchPassword({ type: 'change', value: e.target.value }),
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

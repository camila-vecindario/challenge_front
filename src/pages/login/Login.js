import './Login.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { login } from '../../services/auth.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { SIGN_UP__ROUTE, HOME_ROUTE } from '../../constants/routes';
import {
  EMAIL_ERROR,
  REQUIRED_EMAIL_ERROR,
  REQUIRED_PASSWORD_ERROR,
} from '../../constants/errorsMessages';
import { saveToLocalStorage, redirect } from '../../helpers/utils';

const schema = Yup.object().shape({
  email: Yup.string().email(EMAIL_ERROR).required(REQUIRED_EMAIL_ERROR),
  password: Yup.string().required(REQUIRED_PASSWORD_ERROR),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const { email, password } = data;

    setLoading(true);
    login(email, password)
      .then(data => {
        const { auth_token, user, errors } = data;

        if (!errors) {
          saveToLocalStorage('token', auth_token);
          saveToLocalStorage('user', JSON.stringify(user));
          redirect(HOME_ROUTE);
        }
        setError(errors);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className='login'>
      <h1>Inicio de sesión</h1>
      <div>
        <form className='login__form' onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder='Correo' name='email' ref={register} errors={errors} />
          <Input
            placeholder='Contraseña'
            name='password'
            type='password'
            ref={register}
            errors={error}
          />
          {error && <p className='login__error'>{error}</p>}
          <button className='login__submit' type='submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
      <p>
        ¿No tienes una cuenta?{' '}
        <Link to={SIGN_UP__ROUTE} className='login__signup'>
          Regístrate
        </Link>
      </p>
      <Link to={HOME_ROUTE}>Inicio</Link>
    </div>
  );
};

export default Login;

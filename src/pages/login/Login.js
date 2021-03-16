import './Login.scss';
import { useState } from 'react';
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

const schema = Yup.object().shape({
  email: Yup.string().email(EMAIL_ERROR).required(REQUIRED_EMAIL_ERROR),
  password: Yup.string().required(REQUIRED_PASSWORD_ERROR),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    const { email, password } = data;

    setLoading(true);
    login(email, password)
      .then(() => {
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
            errors={errors}
          />
          <button className='login__submit' type='submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
      <p>
        ¿No tienes una cuenta?{' '}
        <a href={SIGN_UP__ROUTE} className='login__signup'>
          Regístrate
        </a>
      </p>
      <a href={HOME_ROUTE}>Inicio</a>
    </div>
  );
};

export default Login;

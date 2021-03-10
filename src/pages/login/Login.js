import './Login.scss';
import { useState } from 'react';
import Input from '../../components/inputs/Input';
import { login } from '../../services/auth.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('El correo electrónico ingresado no es válido')
    .required('El correo es requerido.'),
  password: Yup.string().required('La contraseña es requerida.'),
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
            Ingresar
          </button>
        </form>
      </div>
      <p>
        ¿No tienes una cuenta?{' '}
        <a href='/sign-up' className='login__signup'>
          {loading ? 'Cargando...' : 'Regístrate'}
        </a>
      </p>
      <a href='/'>Inicio</a>
    </div>
  );
};

export default Login;

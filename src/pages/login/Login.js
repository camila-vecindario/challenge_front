import { useState } from 'react';
import Input from '../../components/inputs/Input';
import { login } from '../../services/auth.services';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmail = e => setEmail(e.target.value);

  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    login(email, password)
      .then(data => {
        setLoading(false);
        console.log(data);
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className='login'>
      <h1>Inicio de sesión</h1>
      <div>
        <form className='login__form' onSubmit={handleSubmit}>
          <Input placeholder='Correo' required value={email} onChange={handleEmail} type='email' />
          <Input
            placeholder='Contraseña'
            type='password'
            required
            value={password}
            onChange={handlePassword}
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

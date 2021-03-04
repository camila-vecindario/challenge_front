import './Login.scss';

const Login = () => {
  return (
    <div className='login'>
      <h1>Inicio de sesión</h1>
      <div className='login__form'>
        <button className='login__submit'>Ingresar</button>
      </div>
      <p>
        ¿No tienes una cuenta?{' '}
        <a href='/sign-up' className='login__signup'>
          Regístrate
        </a>
      </p>
      <a href='/'>Inicio</a>
    </div>
  );
};

export default Login;

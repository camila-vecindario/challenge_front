import './SignUp.scss';

const SignUp = () => {
  return (
    <div className='signup'>
      <h1>Registro de cuenta :D</h1>
      <p>¡Hola! Únete a nosotros.</p>
      <div className='signup__form'>
        <button className='signup__submit'>Unirme</button>
      </div>
      <a href='/'>Volver</a>
    </div>
  );
};

export default SignUp;

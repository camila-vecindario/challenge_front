import Input from '../../components/inputs/Input';
import './SignUp.scss';

const SignUp = () => {
  return (
    <div className='signup'>
      <h1>Registro de cuenta :D</h1>
      <p>¡Hola! Únete a nosotros.</p>
      <div className='signup__form'>
        <form>
          <Input placeholder='Nombre' required />
          <Input placeholder='Apellido' required />
          <Input placeholder='Correo' required type='email' />
          <Input placeholder='Teléfono' required type='phone' />
          <Input placeholder='Contraseña' type='password' required />
          <Input placeholder='Repetir contraseña' type='password' required />
          <button className='signup__submit' type='submit'>
            Unirme
          </button>
        </form>
      </div>
      <a href='/'>Volver</a>
    </div>
  );
};

export default SignUp;

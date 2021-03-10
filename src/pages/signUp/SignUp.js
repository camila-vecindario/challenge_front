import './SignUp.scss';
import Input from '../../components/inputs/Input';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = Yup.object().shape({
  firstName: Yup.string().required('El nombre es requerido.'),
  lastName: Yup.string().required('El apellido es requerido.'),
  email: Yup.string()
    .email('La dirección de correo electrónico ingresada no es válida.')
    .required('El correo electrónico es requerido.'),
  phone: Yup.string().required('El teléfono es requerido.'),
  password: Yup.string().required('La contraseña es requerida.'),
  passwordConfirm: Yup.string()
    .required('Es necesario ingresar nuevamente la contraseña.')
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

const SignUp = () => {
  const { handleSubmit, errors, register } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {};

  return (
    <div className='signup'>
      <h1>Registro de cuenta :D</h1>
      <p>¡Hola! Únete a nosotros.</p>
      <div className='signup__form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder='Nombre' name='firstName' ref={register} errors={errors} />
          <Input placeholder='Apellido' name='lastName' ref={register} errors={errors} />
          <Input placeholder='Correo' name='email' ref={register} errors={errors} />
          <Input
            placeholder='Teléfono móvil'
            name='phone'
            type='phone'
            ref={register}
            errors={errors}
          />
          <Input
            placeholder='Contraseña'
            name='password'
            type='password'
            ref={register}
            errors={errors}
          />
          <Input
            placeholder='Repetir contraseña'
            name='passwordConfirm'
            type='password'
            ref={register}
            errors={errors}
          />
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

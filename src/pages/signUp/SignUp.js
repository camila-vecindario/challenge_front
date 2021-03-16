import './SignUp.scss';
import Input from '../../components/inputs/Input';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HOME_ROUTE } from '../../constants/routes';
import {
  REQUIRED_FIRST_NAME_ERROR,
  REQUIRED_LAST_NAME_ERROR,
  EMAIL_ERROR,
  REQUIRED_EMAIL_ERROR,
  REQUIRED_PHONE_ERROR,
  REQUIRED_PASSWORD_ERROR,
  REQUIRED_CONFIRM_PASSWORD_ERROR,
  NOT_MATCH_PASSWORDS_ERROR,
} from '../../constants/errorsMessages';

const schema = Yup.object().shape({
  firstName: Yup.string().required(REQUIRED_FIRST_NAME_ERROR),
  lastName: Yup.string().required(REQUIRED_LAST_NAME_ERROR),
  email: Yup.string().email(EMAIL_ERROR).required(REQUIRED_EMAIL_ERROR),
  phone: Yup.string().required(REQUIRED_PHONE_ERROR),
  password: Yup.string().required(REQUIRED_PASSWORD_ERROR),
  passwordConfirm: Yup.string()
    .required(REQUIRED_CONFIRM_PASSWORD_ERROR)
    .oneOf([Yup.ref('password')], NOT_MATCH_PASSWORDS_ERROR),
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
      <a href={HOME_ROUTE}>Volver</a>
    </div>
  );
};

export default SignUp;

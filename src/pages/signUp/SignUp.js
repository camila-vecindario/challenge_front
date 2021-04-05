import './SignUp.scss';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Input from '../../components/inputs/Input';
// import ImagePicker from '../../components/inputs/ImagePicker';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../constants/routes';
import {
  REQUIRED_FIRST_NAME_ERROR,
  REQUIRED_LAST_NAME_ERROR,
  EMAIL_ERROR,
  REQUIRED_EMAIL_ERROR,
  REQUIRED_PHONE_ERROR,
  REQUIRED_PASSWORD_ERROR,
  REQUIRED_CONFIRM_PASSWORD_ERROR,
  NOT_MATCH_PASSWORDS_ERROR,
  INVALID_PHONE_FORMAT,
  PASSWORD_LENGTH_ERROR,
} from '../../constants/errorsMessages';
import { store } from 'react-notifications-component';
import { signUp } from '../../services/auth.services';
import { phoneRegex } from '../../helpers/regex';

const schema = Yup.object().shape({
  first_name: Yup.string().required(REQUIRED_FIRST_NAME_ERROR),
  last_name: Yup.string().required(REQUIRED_LAST_NAME_ERROR),
  email: Yup.string().email(EMAIL_ERROR).required(REQUIRED_EMAIL_ERROR),
  phone: Yup.string().required(REQUIRED_PHONE_ERROR).matches(phoneRegex, INVALID_PHONE_FORMAT),
  password: Yup.string()
    .required(REQUIRED_PASSWORD_ERROR)
    .test('len', PASSWORD_LENGTH_ERROR, val => val.length >= 8),
  password_confirmation: Yup.string()
    .required(REQUIRED_CONFIRM_PASSWORD_ERROR)
    .oneOf([Yup.ref('password')], NOT_MATCH_PASSWORDS_ERROR),
});

const SignUp = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, register, setError } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    setLoading(true);
    signUp(values)
      .then(data => {
        const { errors } = data;
        if (!errors) {
          openNotification();
          history.push(LOGIN_ROUTE);
        } else {
          setError('email', { type: 'validation', message: errors.email });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  function openNotification() {
    store.addNotification({
      message: 'Bienvenido a Hola Pues :)',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      dismiss: {
        duration: 1000,
      },
    });
  }

  return (
    <div className='signup'>
      <h3>Registro de cuenta :D</h3>
      <p>¡Hola! Únete a nosotros.</p>
      <div className='signup__form'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*<ImagePicker />*/}
          <Input placeholder='Nombre' name='first_name' ref={register} errors={errors} />
          <Input placeholder='Apellido' name='last_name' ref={register} errors={errors} />
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
            name='password_confirmation'
            type='password'
            ref={register}
            errors={errors}
          />
          <button className='signup__submit' type='submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Unirme'}
          </button>
        </form>
      </div>
      <Link to={HOME_ROUTE}>Volver</Link>
    </div>
  );
};

export default SignUp;

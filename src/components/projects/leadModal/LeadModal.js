import './LeadModal.scss';
import { useState } from 'react';
import Modal from '../../modal/Modal';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectLoggedUser } from '../../../redux/selectors/userSelectors';
import { HOST } from '../../../constants/userConstants';
import { useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createLead } from '../../../services/projects.services';
import {
  EMAIL_ERROR,
  INVALID_PHONE_FORMAT,
  REQUIRED_EMAIL_ERROR,
  REQUIRED_PHONE_ERROR,
  REQUIRED_FIRST_NAME_ERROR,
  REQUIRED_LAST_NAME_ERROR,
} from '../../../constants/errorsMessages';
import { phoneRegex } from '../../../helpers/regex';
import { store } from 'react-notifications-component';

const schema = Yup.object().shape({
  first_name: Yup.string().required(REQUIRED_FIRST_NAME_ERROR),
  last_name: Yup.string().required(REQUIRED_LAST_NAME_ERROR),
  email: Yup.string().email(EMAIL_ERROR).required(REQUIRED_EMAIL_ERROR),
  phone: Yup.string().required(REQUIRED_PHONE_ERROR).matches(phoneRegex, INVALID_PHONE_FORMAT),
});

const LeadModal = ({ visible, onClose, projectId }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const role = useSelector(selectCurrentRole);
  const user = useSelector(selectLoggedUser);

  const showForm = role === HOST && !success;

  const showSuccess = role !== HOST || success;

  const onSubmit = data => {
    setLoading(true);
    createLead(projectId, data)
      .then(() => {
        setSuccess(true);
      })
      .finally(() => setLoading(false))
      .catch(() => openError());
  };

  function openError() {
    store.addNotification({
      message: 'Ha ocurrido un error al generar el lead',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      dismiss: {
        duration: 1500,
      },
    });
  }

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className='lead-modal'>
        <i className='fa fa-times lead-modal__close' onClick={onClose} />
        {showForm && (
          <>
            <h4 className='lead-modal__title'>Déjanos tus datos y nos contactaremos contigo</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input name='first_name' placeholder='Nombres' ref={register} errors={errors} />
              <Input name='last_name' placeholder='Apellidos' ref={register} errors={errors} />
              <Input name='email' placeholder='Correo' ref={register} errors={errors} />
              <Input name='phone' placeholder='Teléfono celular' ref={register} errors={errors} />
              <button type='submit' disabled={loading}>
                {loading ? 'Cargando...' : 'Enviar'}
              </button>
            </form>
          </>
        )}
        {showSuccess && (
          <>
            <img
              className='lead-modal__img'
              src='https://viewinmobiliario2.s3-sa-east-1.amazonaws.com/static_assets/thank_you/scheduler-thankyou-banner-animation.gif'
              alt=''
            />
            <h2 className='lead-modal__title'>Escribe o llama a tu sala de ventas,</h2>
            <h2 className='lead-modal__title'>para una asesoría más rápida.</h2>
            <p>Hemos enviado la siguiente información a tu correo</p>
            <p>
              <b>{user?.email || watch('email')}</b> para que no la pierdas.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LeadModal;

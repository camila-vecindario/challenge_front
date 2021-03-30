import './LeadModal.scss';
import { useState, useCallback } from 'react';
import Modal from '../../modal/Modal';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectLoggedUser } from '../../../redux/selectors/userSelectors';
import { HOST, CLIENT } from '../../../constants/userConstants';
import { useForm } from 'react-hook-form';
import Input from '../../inputs/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { createLead } from '../../../services/projects.services';

const schema = Yup.object().shape({
  first_name: Yup.string().required('El nombre es requerido.'),
  last_name: Yup.string().required('El apellido es requerido.'),
  email: Yup.string()
    .email('La dirección de correo electrónico ingresada no es válida.')
    .required('El correo electrónico es requerido.'),
  phone: Yup.string().required('El teléfono es requerido.'),
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

  const showSuccess = role === CLIENT || success;

  const handleCreateLead = useCallback(
    data => {
      setLoading(true);
      createLead(projectId, data)
        .then(() => {
          setSuccess(true);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    },
    [projectId],
  );

  // useEffect(() => {
  //   if (showSuccess && !loading) {
  //     handleCreateLead(user);
  //   }
  // }, [showSuccess, handleCreateLead, user, loading]);

  const onSubmit = data => {
    handleCreateLead(data);
  };

  return (
    <Modal visible={visible} onClose={onClose}>
      <div className='lead-modal'>
        {showForm && (
          <>
            <h3 className='lead-modal__title'>Déjanos tus datos y nos contactaremos contigo</h3>
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

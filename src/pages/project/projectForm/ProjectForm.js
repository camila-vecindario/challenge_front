import './ProjectForm.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../../redux/selectors/userSelectors';
import Input from '../../../components/inputs/Input';
import { useForm } from 'react-hook-form';
import { projectTypes } from '../../../constants/projectsConstants';
import Layout from '../../../components/layout/Layout';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {
  REQUIRED_PROJECT_NAME_ERROR,
  REQUIRED_ADDRESS_ERROR,
  REQUIRED_BUILT_AREA_ERROR,
  REQUIRED_PRIVATE_AREA_ERROR,
  REQUIRED_BATHROOMS_ERROR,
  NUMBER_TYPE_ERROR,
  POSITIVE_NUMBER_ERROR,
  INTEGER_NUMBER_ERROR,
  REQUIRED_LOCATION_ERROR,
  REQUIRED_PRICE_ERROR,
} from '../../../constants/errorsMessages';
import { getCities } from '../../../services/locations.services';
import { store } from 'react-notifications-component';
import { createProject } from '../../../services/projects.services';
import { HOME_ROUTE } from '../../../constants/routes';

const schema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_PROJECT_NAME_ERROR),
  address: Yup.string().required(REQUIRED_ADDRESS_ERROR),
  price: Yup.number()
    .required(REQUIRED_PRICE_ERROR)
    .positive(POSITIVE_NUMBER_ERROR)
    .integer(INTEGER_NUMBER_ERROR)
    .typeError(NUMBER_TYPE_ERROR),
  built_area: Yup.number()
    .required(REQUIRED_BUILT_AREA_ERROR)
    .positive(POSITIVE_NUMBER_ERROR)
    .typeError(NUMBER_TYPE_ERROR),
  private_area: Yup.number()
    .required(REQUIRED_PRIVATE_AREA_ERROR)
    .positive(POSITIVE_NUMBER_ERROR)
    .typeError(NUMBER_TYPE_ERROR),
  bathrooms: Yup.number()
    .required(REQUIRED_BATHROOMS_ERROR)
    .positive(POSITIVE_NUMBER_ERROR)
    .integer(INTEGER_NUMBER_ERROR)
    .typeError(NUMBER_TYPE_ERROR),
  sales_room_emails: Yup.string(),
  location: Yup.number().min(1, REQUIRED_LOCATION_ERROR).required(REQUIRED_LOCATION_ERROR),
});

const ProjectForm = () => {
  let history = useHistory();
  const [currentType, setCurrentType] = useState('residential');
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getCities().then(data => setCities(data));
  }, []);

  const user = useSelector(selectLoggedUser);

  const types = Object.keys(projectTypes);
  const emails = watch('sales_room_emails') || '';

  const onSubmit = data => {
    const input = {
      project: {
        name: data.name,
        type_project: projectTypes[currentType].id,
        address: data.address,
        price: parseFloat(data.price),
        has_vis: data.vis,
        private_area: parseFloat(data.private_area),
        built_area: parseFloat(data.built_area),
        bathrooms: data.bathrooms,
        has_parking: data.parking,
        sales_room_emails: data.sales_room_emails,
        location_id: data.location,
      },
    };

    setLoading(true);
    createProject(input)
      .then(() => {
        openNotification();
        history.replace(HOME_ROUTE);
      })
      .finally(() => setLoading(false));
  };

  function openNotification() {
    store.addNotification({
      message: 'Proyecto creado :D',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      dismiss: {
        duration: 1000,
      },
    });
  }

  return (
    <Layout>
      <div className='project-form'>
        <h5>{user?.first_name}, ahora vamos a</h5>
        <h5>crear un proyecto</h5>
        <form onSubmit={handleSubmit(onSubmit)} className='project-form__content'>
          <b>Nombre</b>
          <Input
            placeholder='Escribe el nombre de tu proyecto aquí'
            name='name'
            ref={register}
            errors={errors}
          />
          <b>Tipo de proyecto</b>
          <div className='project-form__types'>
            {types.map(type => (
              <div
                key={`project-type-${type}`}
                className={`project-form__type ${
                  currentType === type ? 'project-form__type--active' : ''
                }`}
                onClick={() => setCurrentType(type)}
              >
                <div style={{ backgroundColor: projectTypes[type].color }}>
                  <i className={`fa ${projectTypes[type].icon} fa-2x`} />
                </div>
                <p>{projectTypes[type].value}</p>
              </div>
            ))}
          </div>
          <b>Ciudad</b>
          <select className='input' defaultValue={0} name='location' ref={register}>
            <option value={0}>Ciudad</option>
            {cities.map(city => (
              <option key={`city-${city.id}`} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <p className='input__error'>{errors?.location?.message}</p>
          <b>Dirección</b>
          <Input
            placeholder='Escribe la dirección del proyecto'
            name='address'
            ref={register}
            errors={errors}
          />
          <b>Precio $</b>
          <Input
            placeholder='Escribe el precio del proyecto'
            name='price'
            ref={register}
            errors={errors}
          />
          <div className='form-check project-form__row'>
            <input className='form-check-input' type='checkbox' name='vis' ref={register} />
            <label className='form-check-label' htmlFor='vis'>
              ¿Aplica a subsidio VIS?
            </label>
          </div>
          <div className='form-check project-form__row'>
            <input className='form-check-input' type='checkbox' name='parking' ref={register} />
            <label className='form-check-label' htmlFor='parking'>
              ¿Tiene Parquadero?
            </label>
          </div>
          <b>Área construida</b>
          <Input placeholder='Área construida' name='built_area' ref={register} errors={errors} />
          <b>Área privada</b>
          <Input placeholder='Área privada' name='private_area' ref={register} errors={errors} />
          <b>Número de baños</b>
          <Input placeholder='Número de baños' name='bathrooms' ref={register} errors={errors} />
          <b>Correos de salas de ventas</b>
          <Input
            placeholder='Correos de salas de ventas'
            name='sales_room_emails'
            ref={register}
            errors={errors}
          />
          <div className='project-form__emails'>
            {emails?.length > 0 &&
              emails.split(',').map((email, i) => (
                <div key={`sales-room_email-${i}`} className='project-info__email'>
                  <div />
                  {email}
                </div>
              ))}
          </div>
          <button type='submit' className='project-form__submit' disabled={loading}>
            {loading ? 'Cargando...' : 'Crear'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProjectForm;

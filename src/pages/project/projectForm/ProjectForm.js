import './ProjectForm.scss';
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
} from '../../../constants/errorsMessages';

const schema = Yup.object().shape({
  name: Yup.string().required(REQUIRED_PROJECT_NAME_ERROR),
  address: Yup.string().required(REQUIRED_ADDRESS_ERROR),
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
});

const ProjectForm = () => {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const user = useSelector(selectLoggedUser);

  const types = Object.keys(projectTypes);

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Layout>
      <div className='project-form'>
        <h1>{user.firstName} ahora vamos a</h1>
        <h1>crear un proyecto</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='project-form__content'>
          <Input
            placeholder='Escribe el nombre de tu proyecto aquí'
            name='name'
            ref={register}
            errors={errors}
          />
          <h4>Tipo de proyecto</h4>
          <div className='project-form__types'>
            {types.map(type => (
              <div key={`project-type-${type}`} className='project-form__type'>
                <div style={{ backgroundColor: projectTypes[type].color }}>
                  <i className={`fa ${projectTypes[type].icon} fa-2x`} />
                </div>
                <p>{projectTypes[type].value}</p>
              </div>
            ))}
          </div>
          <Input
            placeholder='Escribe la dirección del proyecto'
            name='address'
            ref={register}
            errors={errors}
          />
          <Input
            placeholder='¿Aplica a subsidio VIS?'
            name='hasVis'
            ref={register}
            errors={errors}
          />
          <Input placeholder='Área construida' name='built_area' ref={register} errors={errors} />
          <Input placeholder='Área privada' name='private_area' ref={register} errors={errors} />
          <Input placeholder='Número de baños' name='bathrooms' ref={register} errors={errors} />
          <Input
            placeholder='¿Tiene Parquadero?'
            name='has_parking'
            ref={register}
            errors={errors}
          />
          <Input
            placeholder='Correos de salas de ventas'
            name='sales_room_emails'
            ref={register}
            errors={errors}
          />
          <button type='submit' className='project-form__submit'>
            Crear
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ProjectForm;

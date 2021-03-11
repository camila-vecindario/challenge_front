import './ProjectCard.scss';
import { projectTypes } from '../../../constants/projectsConstants';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../../redux/selectors/userSelectors';
import { ADMIN } from '../../../constants/userConstants';

const ProjectCard = ({ project }) => {
  const role = useSelector(selectCurrentRole);

  const handleClick = () => {};

  return (
    <div className='project-card'>
      <div className='project-card__header'>
        <b>{project.name}</b>
        <p>{projectTypes[project.type].value}</p>
        <span>
          <b className='project-card__text--city'>{project.location.name}</b>: {project.address}
        </span>
      </div>
      <img className='project-card__cover' alt={project.name} src={project.cover} />
      <div className='project-card__content'>
        <div>
          <div className='project-card__feat'>
            <i className='fal fa-arrows fa-2x project-card__icon' />
            <p>
              {project.builtArea} m<sup>2</sup>
            </p>
          </div>
          <div className='project-card__feat'>
            <i className='fal fa-car fa-2x project-card__icon' />
            <p>{project.hasParking ? 'Incluido' : 'No incluido'}</p>
          </div>
          <div className='project-card__feat'>
            <i className='fal fa-sack fa-2x project-card__icon' />
            <p>{project.hasVis ? 'Aplica subsidio' : 'No aplica subsidio'}</p>
          </div>
          <div className='project-card__feat'>
            <i className='fal fa-toilet fa-2x project-card__icon' />
            <p>{project.bathrooms}</p>
          </div>
        </div>
        {role !== ADMIN && (
          <button className='project-card__button' onClick={handleClick}>
            Conoce más
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

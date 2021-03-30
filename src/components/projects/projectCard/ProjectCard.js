import './ProjectCard.scss';
import { useState } from 'react';
import { projectTypes } from '../../../constants/projectsConstants';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../../redux/selectors/userSelectors';
import { ADMIN } from '../../../constants/userConstants';
import { DEFAULT_COVER } from '../../../constants/projectsConstants';
import LeadModal from '../leadModal/LeadModal';

const ProjectCard = ({ project }) => {
  const [showLead, setShowLead] = useState(false);

  const role = useSelector(selectCurrentRole);

  const handleShowLead = () => setShowLead(!showLead);

  return (
    <>
      <div className='project-card'>
        <div className='project-card__header'>
          <b>{project.name}</b>
          <p>{projectTypes[project.type_project].value}</p>
          <span>
            <b className='project-card__text--city'>{project.location.name}</b>: {project.address}
          </span>
        </div>
        <img
          className='project-card__cover'
          alt={project.name}
          src={project.cover || DEFAULT_COVER}
        />
        <div className='project-card__content'>
          <div>
            <div className='project-card__feat'>
              <i className='fal fa-arrows fa-2x project-card__icon' />
              <p>
                {project.built_area} m<sup>2</sup>
              </p>
            </div>
            <div className='project-card__feat'>
              <i className='fal fa-car fa-2x project-card__icon' />
              <p>{project.has_parking ? 'Incluido' : 'No incluido'}</p>
            </div>
            <div className='project-card__feat'>
              <i className='fal fa-sack fa-2x project-card__icon' />
              <p>{project.has_vis ? 'Aplica subsidio' : 'No aplica subsidio'}</p>
            </div>
            <div className='project-card__feat'>
              <i className='fal fa-toilet fa-2x project-card__icon' />
              <p>{project.bathrooms}</p>
            </div>
          </div>
          {role !== ADMIN && (
            <button className='project-card__button' onClick={handleShowLead}>
              Conoce más
            </button>
          )}
        </div>
      </div>
      {showLead && <LeadModal visible={showLead} onClose={handleShowLead} projectId={project.id} />}
    </>
  );
};

export default ProjectCard;

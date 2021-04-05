import './ProjectCard.scss';
import { useState, useCallback } from 'react';
import { projectTypes } from '../../../constants/projectsConstants';
import { useSelector } from 'react-redux';
import { selectCurrentRole, selectLoggedUser } from '../../../redux/selectors/userSelectors';
import { HOST } from '../../../constants/userConstants';
import { DEFAULT_COVER } from '../../../constants/projectsConstants';
import LeadModal from '../leadModal/LeadModal';
import { createLead } from '../../../services/projects.services';
import { prettyPrice } from '../../../helpers/utils';

const ProjectCard = ({ project }) => {
  const [showLead, setShowLead] = useState(false);
  const [loading, setLoading] = useState(false);

  const role = useSelector(selectCurrentRole);
  const user = useSelector(selectLoggedUser);

  const handleShowLead = () => {
    if (role === HOST) {
      setShowLead(true);
    } else {
      create();
    }
  };

  const create = useCallback(() => {
    setLoading(true);
    createLead(project.id, user)
      .then(() => {
        setShowLead(true);
      })
      .finally(() => setLoading(false));
  }, [project, user]);

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
        <div className='project-card__price-wrapper'>
          <p>Precio final desde: </p>
          <h4 className='project-card__price'>{prettyPrice(project.price)} millones*</h4>
        </div>
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
          <button className='project-card__button' onClick={handleShowLead} disabled={loading}>
            {loading ? 'enviando...' : 'Conoce más'}
          </button>
        </div>
      </div>
      {showLead && (
        <LeadModal visible={showLead} onClose={() => setShowLead(false)} projectId={project.id} />
      )}
    </>
  );
};

export default ProjectCard;

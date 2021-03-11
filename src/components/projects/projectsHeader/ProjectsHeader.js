import './ProjectsHeader.scss';
import { projectTypes } from '../../../constants/projectsConstants';

const ProjectsHeader = () => {
  const types = Object.keys(projectTypes);

  return (
    <div className='projects-header'>
      {types.map(type => (
        <button key={`project-type-${type}`} className='projects-header__button'>
          <i className={`fal ${projectTypes[type].icon} fa-2x`} />
          <b>{projectTypes[type].value}</b>
        </button>
      ))}
    </div>
  );
};

export default ProjectsHeader;

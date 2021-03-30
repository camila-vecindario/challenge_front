import './ProjectsSearch.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { useSelector } from 'react-redux';
import { selectProjectsName } from '../../../redux/selectors/projectsSelectors';
import { CREATE_PROJECT_ROUTE, PROJECTS_ROUTE } from '../../../constants/routes';

const ProjectsSearch = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);

  const projects = useSelector(selectProjectsName);

  const handleOpen = () => setOpen(!open);

  const handleCreation = () => {
    history.push(CREATE_PROJECT_ROUTE);
  };

  const handleProject = id => {
    setOpen(false);
    history.push(`${PROJECTS_ROUTE}/${id}`);
  };

  return (
    <Popover
      isOpen={open}
      onClickOutside={handleOpen}
      positions={['bottom']}
      align='end'
      padding={2}
      content={
        <div className='project-search__content'>
          <div
            className='project-search__section project-search__creation'
            onClick={handleCreation}
          >
            <i className='fa fa-plus' />
            <b>Crear proyecto</b>
          </div>
          <hr />
          <div className='project-search__section'>
            <input placeholder='buscar' />
          </div>
          <hr />
          <div className='project-search__section'>
            {projects.map(project => (
              <p key={`project-${project.id}`} onClick={() => handleProject(project.id)}>
                {project.name}
              </p>
            ))}
          </div>
        </div>
      }
    >
      <div className='project-search' onClick={handleOpen}>
        <p>Proyectos</p>
        <i className='fa fa-chevron-down' />
      </div>
    </Popover>
  );
};

export default ProjectsSearch;

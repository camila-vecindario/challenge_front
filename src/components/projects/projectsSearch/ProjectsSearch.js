import './ProjectsSearch.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Popover } from 'react-tiny-popover';
import { CREATE_PROJECT_ROUTE, PROJECTS_ROUTE } from '../../../constants/routes';
import { getProjects } from '../../../services/user.services';
import { useSelector } from 'react-redux';
import { selectCurrentProject } from '../../../redux/selectors/projectsSelectors';

const ProjectsSearch = () => {
  let history = useHistory();
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    setLoading(true);
    getProjects(name)
      .then(data => setProjects(data))
      .finally(() => setLoading(false));
  }, [name]);

  const project = useSelector(selectCurrentProject);

  const handleOpen = () => setOpen(!open);

  const handleNameChange = e => setName(e.target.value);

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
            <input placeholder='buscar' value={name} onChange={handleNameChange} />
          </div>
          <hr />
          <div className='project-search__section'>
            {loading && <p>Cargando...</p>}
            {projects.length === 0 && !loading && <p>No se encontraron proyectos asociados</p>}
            {!loading &&
              projects.map(project => (
                <p key={`project-${project.id}`} onClick={() => handleProject(project.id)}>
                  {project.name}
                </p>
              ))}
          </div>
        </div>
      }
    >
      <div className='project-search' onClick={handleOpen}>
        <p>{project?.name || 'Proyectos'}</p>
        <i className='fa fa-chevron-down' />
      </div>
    </Popover>
  );
};

export default ProjectsSearch;

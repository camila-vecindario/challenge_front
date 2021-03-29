import './Projects.scss';
import { useEffect } from 'react';
import Layout from '../../../components/layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects, selectFilter } from '../../../redux/selectors/projectsSelectors';
import { load } from '../../../redux/slices/projectsSlice';
import ProjectCard from '../../../components/projects/projectCard/ProjectCard';
import ProjectsHeader from '../../../components/projects/projectsHeader/ProjectsHeader';
import { getProjects } from '../../../services/projects.services';

const Projects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);

  const filter = useSelector(selectFilter);

  useEffect(() => {
    getProjects(filter).then(data => dispatch(load(data)));
  }, [dispatch, filter]);

  return (
    <Layout>
      <div className='projects'>
        <ProjectsHeader />
        <div className='projects__content'>
          {projects.map(project => (
            <ProjectCard project={project} key={`project-${project.id}`} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;

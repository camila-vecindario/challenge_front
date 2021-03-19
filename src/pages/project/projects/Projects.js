import './Projects.scss';
import Layout from '../../../components/layout/Layout';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../../redux/selectors/projectsSelectors';
import ProjectCard from '../../../components/projects/projectCard/ProjectCard';
import ProjectsHeader from '../../../components/projects/projectsHeader/ProjectsHeader';

const Projects = () => {
  const projects = useSelector(selectProjects);

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

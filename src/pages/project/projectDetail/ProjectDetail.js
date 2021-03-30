import './ProjectDetail.scss';
import { useEffect, memo } from 'react';
import { useParams, useRouteMatch, Route, Switch, NavLink } from 'react-router-dom';
import Layout from '../../../components/layout/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentProject, selectProjects } from '../../../redux/selectors/projectsSelectors';
import { updateCurrentProject } from '../../../redux/slices/projectsSlice';
import { PROJECT_LEADS_ROUTE } from '../../../constants/routes';
import ProjectLeads from '../projectLeads/ProjectLeads';
import ProjectInfo from '../projectInfo/projectInfo';
import { findProjectById } from '../../../services/projects.services';

const ProjectDetail = () => {
  const { projectId } = useParams();
  let { path, url } = useRouteMatch();
  const dispatch = useDispatch();

  const projects = useSelector(selectProjects);
  const project = useSelector(selectCurrentProject);

  useEffect(() => {
    const currentProject = projects.find(project => project.id.toString() === projectId);
    if (currentProject) {
      dispatch(updateCurrentProject(currentProject));
    } else {
      findProjectById(projectId).then(data => dispatch(updateCurrentProject(data)));
    }
  }, [projectId, projects, dispatch]);

  return (
    <Layout>
      <div className='project-detail'>
        <div className='project-detail__menu'>
          <h3>{project?.name}</h3>
          <MenuItem to={url} title='Información general' icon='project-diagram' />
          <MenuItem to={`${url}${PROJECT_LEADS_ROUTE}`} title='Leads' icon='users' />
        </div>
        <div className='project-detail__content'>
          <Switch>
            <Route exact path={path}>
              <ProjectInfo />
            </Route>
            <Route exact path={`${path}${PROJECT_LEADS_ROUTE}`}>
              <ProjectLeads />
            </Route>
          </Switch>
        </div>
      </div>
    </Layout>
  );
};

const MenuItem = memo(({ to, icon, title }) => (
  <div className='project-detail__menu-item'>
    <NavLink exact to={to} activeClassName='project-detail__active'>
      <i className={`fa fa-${icon} fa-1x`} />
      <p>{title}</p>
    </NavLink>
  </div>
));

export default ProjectDetail;

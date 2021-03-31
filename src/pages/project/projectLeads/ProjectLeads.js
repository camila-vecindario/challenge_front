import './ProjectLeads.scss';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectLeads } from '../../../redux/selectors/projectsSelectors';
import { loadLeads } from '../../../redux/slices/projectsSlice';
import Table from '../../../components/table/Table';
import { getProjectLeads } from '../../../services/projects.services';
import { prettyDate } from '../../../helpers/utils';

const ProjectLeads = () => {
  const { projectId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    getProjectLeads(projectId, abortController).then(
      data => !data.error && dispatch(loadLeads(data)),
    );

    return function () {
      abortController.abort();
    };
  }, [dispatch, projectId]);

  const leads = useSelector(selectProjectLeads);

  const tableHeaders = ['', 'Nombre', 'Realizado', 'Correo', 'Teléfono'];

  const tableData = useMemo(
    () =>
      leads.map(lead => {
        return {
          avatar: lead.picture ? (
            <img src={lead.picture} alt={lead.firstName} className='project-leads__avatar' />
          ) : (
            <div className='project-leads__avatar'>
              <span>{lead.fullName.charAt(0).toUpperCase()}</span>
            </div>
          ),
          name: `${lead.fullName}`,
          createdAt: prettyDate(lead.created_at),
          email: lead.email,
          phone: lead.phone,
        };
      }),
    [leads],
  );

  return (
    <div className='project-leads'>
      <h3>Leads generados</h3>
      <div className='project-leads__score'>
        <h1>{leads.length}</h1>
      </div>
      <div className='project-leads__content'>
        <Table headers={tableHeaders} data={tableData} />
      </div>
    </div>
  );
};

export default ProjectLeads;

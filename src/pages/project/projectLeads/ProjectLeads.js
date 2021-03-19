import './ProjectLeads.scss';
import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProjectLeads } from '../../../redux/selectors/projectsSelectors';
import { loadLeads } from '../../../redux/slices/projectsSlice';
import Table from '../../../components/table/Table';

const ProjectLeads = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const projectLeads = [
      {
        id: 1,
        firstName: 'Juan',
        lastName: 'Simulador',
        email: 'juanitosimulando@gmail.com',
        picture: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
        phone: '321 745 6359',
        createdAt: '13/03/21',
      },
      {
        id: 2,
        firstName: 'María Paula',
        lastName: 'Pardo Rodríguez',
        email: 'mapurodriguez@gmail.com',
        picture: '',
        phone: '314 345 2412',
        createdAt: '14/03/21',
      },
    ];

    dispatch(loadLeads(projectLeads));
  }, [dispatch]);

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
              <span>
                {lead.firstName.charAt(0).toUpperCase()}
                {lead.lastName.charAt(0).toUpperCase()}
              </span>
            </div>
          ),
          name: `${lead.firstName} ${lead.lastName}`,
          createdAt: lead.createdAt,
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

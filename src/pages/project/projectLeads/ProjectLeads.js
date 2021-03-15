import { useParams } from 'react-router-dom';

const ProjectLeads = () => {
  const { projectId } = useParams();
  return <div>Leads del proyecto {projectId}</div>;
};

export default ProjectLeads;

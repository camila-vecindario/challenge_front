import './ProjectsHeader.scss';
import { projectTypes } from '../../../constants/projectsConstants';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../../redux/slices/projectsSlice';
import { selectFilter } from '../../../redux/selectors/projectsSelectors';

const ProjectsHeader = () => {
  const dispatch = useDispatch();

  const types = Object.keys(projectTypes);

  const currentFilter = useSelector(selectFilter);

  const handleClick = type => {
    dispatch(updateFilter(type !== currentFilter ? type : -1));
  };

  return (
    <div className='projects-header'>
      {types.map(type => (
        <button
          key={`project-type-${type}`}
          className='projects-header__button'
          onClick={() => handleClick(projectTypes[type].id)}
          style={{
            borderColor: currentFilter === projectTypes[type].id && projectTypes[type].color,
            borderWidth: 2,
          }}
        >
          <i
            className={`fal ${projectTypes[type].icon} fa-2x`}
            style={{ color: projectTypes[type].color }}
          />
          <b>{projectTypes[type].value}</b>
        </button>
      ))}
    </div>
  );
};

export default ProjectsHeader;

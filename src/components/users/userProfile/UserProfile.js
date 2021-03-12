import './UserProfile.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentRole, selectLoggedUser } from '../../../redux/selectors/userSelectors';
import { Popover } from 'react-tiny-popover';
import { userRoles } from '../../../constants/userConstants';
import { logOut } from '../../../redux/slices/userSlice';
import ProjectsSearch from '../../projects/projectsSearch/ProjectsSearch';
import { R_HOME } from '../../../constants/routes';

const UserProfile = () => {
  let history = useHistory();
  const [openOptions, setOpenOptions] = useState(false);

  const dispatch = useDispatch();

  const user = useSelector(selectLoggedUser);
  const role = useSelector(selectCurrentRole);

  const handleOpenOptions = () => setOpenOptions(!openOptions);

  const handleAccount = () => {};

  const handleSignOut = () => {
    dispatch(logOut());
    history.push(R_HOME);
  };

  return (
    <div className='user-profile'>
      <img className='user-profile__picture' alt='user' src={user.picture} />
      <div className='user-profile__info'>
        <b>{user.firstName}</b>
        <p>{user.email}</p>
        <p>{userRoles[role].value}</p>
      </div>
      <Popover
        isOpen={openOptions}
        positions={['bottom', 'left', 'right']}
        align='end'
        content={
          <div className='user-profile__options' onClick={handleOpenOptions}>
            <div className='user-profile__option' onClick={handleAccount}>
              <i className='fal fa-user-circle fa-1x' />
              <p>Cuenta</p>
            </div>
            <div className='user-profile__option' onClick={handleSignOut}>
              <i className='fal fa-sign-out-alt fa-1x' />
              <p>Cerrar sesión</p>
            </div>
          </div>
        }
        onClickOutside={handleOpenOptions}
      >
        <div>
          <i
            className={`fa ${openOptions ? 'fa-chevron-up' : 'fa-chevron-down'} user-profile__icon`}
            onClick={handleOpenOptions}
          />
        </div>
      </Popover>
    </div>
  );
};

export const AdminBar = () => {
  return (
    <div className='admin-bar'>
      <ProjectsSearch />
      <UserProfile />
    </div>
  );
};

export const ClientBar = () => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

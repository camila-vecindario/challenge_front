import './UserProfile.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentRole, selectLoggedUser } from '../../../redux/selectors/userSelectors';
import { Popover } from 'react-tiny-popover';
import { userRoles, DEFAULT_PICTURE } from '../../../constants/userConstants';
import { logOut } from '../../../redux/slices/userSlice';
import ProjectsSearch from '../../projects/projectsSearch/ProjectsSearch';
import { ACCOUNT_ROUTE, LOGIN_ROUTE } from '../../../constants/routes';
import { signOut, redirect } from '../../../helpers/utils';

const UserProfile = () => {
  const [openOptions, setOpenOptions] = useState(false);

  const user = useSelector(selectLoggedUser);
  const role = useSelector(selectCurrentRole);

  const handleOpenOptions = () => setOpenOptions(!openOptions);

  return (
    <div className='user-profile'>
      <img className='user-profile__picture' alt='user' src={user.picture || DEFAULT_PICTURE} />
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
            <UserOptions />
          </div>
        }
        onClickOutside={handleOpenOptions}
      >
        <div className='large-items'>
          <i
            className={`fa ${openOptions ? 'fa-chevron-up' : 'fa-chevron-down'} user-profile__icon`}
            onClick={handleOpenOptions}
          />
        </div>
      </Popover>
    </div>
  );
};

export const UserOptions = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleAccount = () => {
    history.push(ACCOUNT_ROUTE);
  };

  const handleSignOut = () => {
    redirect(LOGIN_ROUTE);
    dispatch(logOut());
    signOut();
  };

  return (
    <div>
      <div className='user-profile__option' onClick={handleAccount}>
        <i className='fal fa-user-circle fa-1x' />
        <p>Cuenta</p>
      </div>
      <div className='user-profile__option' onClick={handleSignOut}>
        <i className='fal fa-sign-out-alt fa-1x' />
        <p>Cerrar sesión</p>
      </div>
    </div>
  );
};

export const AdminBar = () => {
  return (
    <div className='admin-bar'>
      <div className='large-items'>
        <ProjectsSearch />
      </div>
      <div className='small-items'>
        <UserOptions />
      </div>
      <div className='small-items'>
        <ProjectsSearch />
      </div>
      <UserProfile />
    </div>
  );
};

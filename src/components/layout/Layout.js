import './Layout.scss';
import { useHistory } from 'react-router-dom';
import { selectCurrentRole } from '../../redux/selectors/userSelectors';
import { useSelector } from 'react-redux';
import { ADMIN, HOST, CLIENT } from '../../constants/userConstants';
import { AdminBar, ClientBar } from '../users/userProfile/UserProfile';
import { SIGN_UP__ROUTE, LOGIN_ROUTE, HOME_ROUTE } from '../../constants/routes';

const Layout = ({ children }) => {
  const currentRole = useSelector(selectCurrentRole);

  return (
    <>
      <nav className='nav'>
        <a href={HOME_ROUTE} className='nav__logo'>
          Hola Pues
        </a>
        <div>
          <div className='nav__bar'>
            {currentRole === HOST && <HostBar />}
            {currentRole === ADMIN && <AdminBar />}
            {currentRole === CLIENT && <ClientBar />}
          </div>
          <i className='fa fa-bars fa-3x nav__icon' />
        </div>
      </nav>
      <div className='layout__content'>{children}</div>
    </>
  );
};

const HostBar = () => {
  const history = useHistory();

  const handleSignUp = () => history.push(SIGN_UP__ROUTE);

  const handleLogin = () => history.push(LOGIN_ROUTE);

  return (
    <>
      <button className='nav__btn nav__btn--main' onClick={handleSignUp}>
        Registrarse
      </button>
      <button className='nav__btn' onClick={handleLogin}>
        Ingresar
      </button>
    </>
  );
};

export default Layout;

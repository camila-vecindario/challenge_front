import './Layout.scss';
import { useHistory, Link } from 'react-router-dom';
import { selectCurrentRole, selectLoggedUser } from '../../redux/selectors/userSelectors';
import { useSelector } from 'react-redux';
import { HOST } from '../../constants/userConstants';
import { AdminBar } from '../users/userProfile/UserProfile';
import { SIGN_UP__ROUTE, LOGIN_ROUTE, HOME_ROUTE } from '../../constants/routes';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Layout = ({ children }) => {
  const currentRole = useSelector(selectCurrentRole);
  const user = useSelector(selectLoggedUser);

  return (
    <>
      <Navbar expand='md' className='nav'>
        <Link to={HOME_ROUTE} className='nav__logo'>
          Hola Pues
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='nav__toggle' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto nav__bar'>
            {currentRole === HOST || !user ? <HostBar /> : <AdminBar />}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className='layout__content'>{children}</div>
    </>
  );
};

const HostBar = () => {
  const history = useHistory();

  const handleSignUp = () => history.push(SIGN_UP__ROUTE);

  const handleLogin = () => history.push(LOGIN_ROUTE);

  return (
    <div>
      <button className='nav__btn nav__btn--main' onClick={handleSignUp}>
        Registrarse
      </button>
      <button className='nav__btn' onClick={handleLogin}>
        Ingresar
      </button>
    </div>
  );
};

export default Layout;

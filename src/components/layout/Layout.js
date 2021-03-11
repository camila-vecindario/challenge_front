import './Layout.scss';
import { useHistory } from 'react-router-dom';
import { selectCurrentRole } from '../../redux/selectors/userSelectors';
import { useSelector } from 'react-redux';
import { ADMIN, HOST, CLIENT } from '../../constants/userConstants';

const Layout = ({ children }) => {
  const currentRole = useSelector(selectCurrentRole);

  return (
    <>
      <nav className='nav'>
        <a href='/' className='nav__logo'>
          Hola Pues
        </a>
        <div>
          {currentRole === HOST && <HostBar />}
          {currentRole === ADMIN && <AdminBar />}
          {currentRole === CLIENT && <ClientBar />}
          <i className='fa fa-bars fa-3x nav__icon' />
        </div>
      </nav>
      <div className='layout__content'>{children}</div>
    </>
  );
};

const HostBar = () => {
  let history = useHistory();

  const handleSignUp = () => history.push('/sign-up');

  const handleLogin = () => history.push('/login');

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

const AdminBar = () => {
  return <h1 className='nav__bar'>Admin</h1>;
};

const ClientBar = () => {
  return <h1 className='nav__bar'>Cliente</h1>;
};

export default Layout;

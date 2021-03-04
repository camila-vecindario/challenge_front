import { useHistory } from 'react-router-dom';
import './Layout.scss';

const Layout = ({ children }) => {
  let history = useHistory();

  const handleSignUp = () => history.push('/sign-up');

  const handleLogin = () => history.push('/login');

  return (
    <>
      <nav className='nav'>
        <a href='/' className='nav__logo'>
          Hola Pues
        </a>
        <div>
          <button className='nav__btn nav__btn--main' onClick={handleSignUp}>
            Registrarse
          </button>
          <button className='nav__btn' onClick={handleLogin}>
            Ingresar
          </button>
          <i className='fa fa-bars fa-3x nav__icon' />
        </div>
      </nav>
      <div className='layout__content'>{children}</div>
    </>
  );
};

export default Layout;

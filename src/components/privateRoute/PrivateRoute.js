import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoggedUser } from '../../redux/selectors/userSelectors';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector(selectLoggedUser);
  const token = localStorage.getItem('token');

  const logged = user || token;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        logged ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

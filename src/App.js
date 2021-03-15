import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './pages/project/projects/Projects';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import PrivateRoute from './components/privateRoute/PrivateRoute';
import {
  R_HOME,
  R_LOGIN,
  R_SIGN_UP,
  R_CREATE_PROJECT,
  R_PROJECT_DETAIL,
  R_NOT_FOUND,
} from './constants/routes';
import ProjectForm from './pages/project/projectForm/ProjectForm';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path={R_HOME}>
            <Projects />
          </Route>
          <Route exact path={R_LOGIN}>
            <Login />
          </Route>
          <Route exact path={R_SIGN_UP}>
            <SignUp />
          </Route>
          <PrivateRoute exact path={R_CREATE_PROJECT}>
            <ProjectForm />
          </PrivateRoute>
          <PrivateRoute exact path={R_PROJECT_DETAIL}>
            <h1>Proyecto 1</h1>
          </PrivateRoute>
          <Route path={R_NOT_FOUND}>
            <h1>Página no encontrada</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

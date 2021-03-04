import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Projects from './pages/project/projects/Projects';
import Login from './pages/login/Login';
import SignUp from './pages/signUp/SignUp';
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/'>
            <Projects />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/sign-up'>
            <SignUp />
          </Route>
          <Route path='*'>
            <h1>Página no encontrada</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import UserPage from './components/account/UserPage';
import Login from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import Registration from './components/auth/Registration';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/registration'>
          <Registration />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/account'>
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

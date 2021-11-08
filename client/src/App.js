import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Registration from './components/auth/Registration';

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/registration'>
          <Registration />
        </Route>
        <Route path='/login'>
          Login
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

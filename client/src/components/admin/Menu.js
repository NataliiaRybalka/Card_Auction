import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import "./Admin.css";
import { Dashboard } from './Dashboard';
import { Users } from '../users/Users';
import { Cards } from '../cards/Cards';
import { Auctions } from '../auctions/Auctions';

export const Menu = () => {

  return (
    <nav>
      <Router>
        <Link to='/admin' className={'navLinks'}>Dashboard</Link>
        <br />
        <Link to='/admin/users' className={'navLinks'}>Users</Link>
        <br />
        <Link to='/admin/cards' className={'navLinks'}>Cards</Link>
        <br />
        <Link to='/admin/auctions' className={'navLinks'}>Auctions</Link>

        <Switch>
          <Route path='/admin/users' component={Users} />
          <Route path='/admin/cards' component={Cards} />
          <Route path='/admin/auctions' component={Auctions} />
          <Route path='/admin' component={Dashboard} exact />
        </Switch>
      </Router>
    </nav>
  );
};

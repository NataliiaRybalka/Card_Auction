import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import ReceiptIcon from "@material-ui/icons/Receipt";

import "./Admin.css";
import { Dashboard } from './Dashboard';
import { Users } from '../users/Users';
import { Cards } from '../cards/Cards';
import { Auctions } from '../auctions/Auctions';
export const Menu = () => {

  return (
    <div>
      <Router>
        <nav id={'adminMenu'}>
          <div className={'navLinkDiv'}> <Link to='/admin' className={'navLinks'}> <DashboardIcon /> Dashboard</Link> </div>
          <br />
          <div className={'navLinkDiv'}> <Link to='/admin/users' className={'navLinks'}> <GroupIcon /> Users</Link> </div>
          <br />
          <div className={'navLinkDiv'}> <Link to='/admin/cards' className={'navLinks'}> <RecentActorsIcon /> Cards</Link> </div>
          <br />
          <div className={'navLinkDiv'}> <Link to='/admin/auctions' className={'navLinks'}> <ReceiptIcon /> Auctions</Link> </div>
        </nav>

        <Switch>
          <Route path='/admin/users' component={Users} />
          <Route path='/admin/cards' component={Cards} />
          <Route path='/admin/auctions' component={Auctions} />
          <Route path='/admin' component={Dashboard} exact />
        </Switch>
      </Router>
    </div>
  );
};

import { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import ReceiptIcon from "@material-ui/icons/Receipt";
import Chat from "@material-ui/icons/Chat";

import "./Admin.css";
import { Dashboard } from './Dashboard';
import { Users } from '../users/Users';
import { Cards } from '../cards/Cards';
import { Sets } from '../sets/Sets';
import { Auctions } from '../auctions/Auctions';
import { Account } from '../account/Account';
import { Chats } from '../chats/Chats';
import { socket } from '../../constants/socket';

export const AdminMenu = () => {
  const [countMessages, setCountMessages] = useState(0);

  socket.on('receive_notification_to_menu_with_connect', (count) => {
    setCountMessages(count);
  });
  socket.on('receive_notification_to_menu', (count) => {
    setCountMessages(count);
  });

  return (
    <div>
      <nav id={'adminMenu'}>
        <div className={'navLinkDiv'}> <Link to='/admin' className={'navLinks'}> <DashboardIcon /> Dashboard</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/admin/users' className={'navLinks'}> <GroupIcon /> Users</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/admin/cards' className={'navLinks'}> <RecentActorsIcon /> Cards</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/admin/sets' className={'navLinks'}> <ViewCarouselIcon /> Sets</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/admin/auctions' className={'navLinks'}> <ReceiptIcon /> Auctions</Link> </div>
        <br />
        <div className={'navLinkDiv'}>
          <Link to='/chats' className={'navLinks'}>
            <Chat /> Chats  {!!countMessages && <span id={'countMessages'}>{countMessages}</span>}
          </Link>
        </div>
      </nav>

      <Switch>
        <Route path='/admin/account' component={Account} />
        <Route path='/admin/users' component={Users} />
        <Route path='/admin/cards' component={Cards} />
        <Route path='/admin/sets' component={Sets} />
        <Route path='/admin/auctions' component={Auctions} />
        <Route path='/chats' component={Chats} />
        <Route path='/admin' component={Dashboard} exact />
      </Switch>
    </div>
  );
};

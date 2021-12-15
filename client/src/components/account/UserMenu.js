import { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import GroupIcon from "@material-ui/icons/Group";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ReceiptIcon from "@material-ui/icons/Receipt";
import Chat from "@material-ui/icons/Chat";

import { Auctions } from '../auctions/Auctions';
import { Account } from './Account';
import { Users } from '../users/Users';
import { FAQ } from '../faq/FAQ';
import { MyCards } from '../cards/MyCards';
import { Chats } from '../chats/Chats';
import { socket } from '../../constants/socket';

export const UserMenu = () => {
  const [countMessages, setCountMessages] = useState(0);

  socket.on('receive_notification_to_menu', (count) => {
    setCountMessages(count);
  });

  return (
    <div>
      <nav id={'adminMenu'}>
        <div className={'navLinkDiv'}> <Link to='/my-cards' className={'navLinks'}> <RecentActorsIcon /> My Cards</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/auctions' className={'navLinks'}> <ReceiptIcon /> Auctions</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/faq' className={'navLinks'}> <LiveHelpIcon /> F.A.Q.</Link> </div>
        <br />
        <div className={'navLinkDiv'}> <Link to='/rating' className={'navLinks'}> <GroupIcon /> Rating</Link> </div>
        <br />
        <div className={'navLinkDiv'}>
          <Link to='/chats' className={'navLinks'}>
            <Chat /> Chats {!!countMessages && <span id={'countMessages'}>{countMessages}</span>}
          </Link>
        </div>
      </nav>

      <Switch>
        <Route path='/my-cards' component={MyCards} />
        <Route path='/rating' component={Users} />
        <Route path='/faq' component={FAQ} />
        <Route path='/auctions' component={Auctions} />
        <Route path='/chats' component={Chats} />
        <Route path='/account' component={Account} exact />
      </Switch>
    </div>
  );
};

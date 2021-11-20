import { Switch, Route, Link } from 'react-router-dom';

import GroupIcon from "@material-ui/icons/Group";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ReceiptIcon from "@material-ui/icons/Receipt";

import { Auctions } from '../auctions/Auctions';
import { Account } from './Account';
import { Users } from '../users/Users';
import { FAQ } from '../faq/FAQ';

export const UserMenu = () => {

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
      </nav>

      <Switch>
        <Route path='/account' component={Account} exact />
        <Route path='/rating' component={Users} />
        <Route path='/faq' component={FAQ} />
        <Route path='/auctions' component={Auctions} />
      </Switch>
    </div>
  );
};

import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { History } from './components/cards/History';
import { Balance } from './components/account/Balance';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import { Registration } from './components/auth/Registration';
import { Footer } from './components/pages/Footer';
import { Header } from './components/pages/Header';
import { AdminMenu } from './components/admin/AdminMenu';
import { Reload } from './components/auxiliary/Reload';
import { UserMenu } from './components/account/UserMenu';
import { Cards } from './components/cards/Cards';
import { Sets } from './components/sets/Sets';
import { Chat } from './components/chats/Chat';
import { Verify } from './components/pages/Verify';
import { AccountRecovery } from './components/auth/AccountRecovery';
import { RefreshPassword } from './components/auth/RefreshPassword';
import { ADMIN } from './constants/contants';

function App() {

  return (
    <div>
      <Header />

      <main>
        {!!localStorage.getItem('refreshToken') && (
          localStorage.getItem('role') === ADMIN 
          ? <AdminMenu />
          : <UserMenu />
        )}

        <Switch>
          <Route path='/account/:verifyLink' component={Verify} />
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/account-recovery' component={AccountRecovery} />
          <Route path='/refresh-password/:userId' component={RefreshPassword} />
          <Route path='/reload' component={Reload} />
          <Route path='/faq/cards' component={Cards} />
          <Route path='/faq/sets' component={Sets} />
          <Route path='/chat' component={Chat} />
          <Route path='/account/history' render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <History />
          )} />
          <Route path='/account/balance' render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <Balance />
          )} />
        </Switch>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;

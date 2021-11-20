import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { History } from './components/account/History';
import { Balance } from './components/account/Balance';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import { Registration } from './components/auth/Registration';
import { Footer } from './components/pages/Footer';
import { Header } from './components/pages/Header';
import { AdminMenu } from './components/admin/AdminMenu';
import { Reload } from './components/auxiliary/Reload';
import { UserMenu } from './components/account/UserMenu';
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
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/reload' component={Reload} />
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

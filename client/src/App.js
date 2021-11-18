import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import { Account } from './components/account/Account';
import { History } from './components/account/History';
import { Balance } from './components/account/Balance';
import { Admin } from './components/admin/Admin';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import { Registration } from './components/auth/Registration';
import { Footer } from './components/pages/Footer';
import { Header } from './components/pages/Header';
import { Users } from './components/users/Users';
import { ADMIN } from './constants/contants';
import { AdminMenu } from './components/admin/AdminMenu';

function App() {

  return (
    <Router>
      <Header />

      <main>
        <AdminMenu />
        <Switch>
          <Route path='/registration' component={Registration} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/rating' component={Users} />
          <Route path='/account/history' render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <History />
          )} />
          <Route path='/account/balance' render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <Balance />
          )} />
          <Route path='/account' exact render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <Account />
          )} />
          <Route path='/admin/account' render={() => (
            !localStorage.getItem('refreshToken') ? <Redirect to='/' /> : <Account />
          )} />
          <Route path='/admin' exact render={() => (
            (!localStorage.getItem('refreshToken') || localStorage.getItem('role') !== ADMIN) ? <Redirect to='/' /> : <Admin />
          )} />
        </Switch>
      </main>
      
      <Footer />
    </Router>
  );
}

export default App;

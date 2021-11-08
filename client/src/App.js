import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import UserPage from './components/account/UserPage';
import Login from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import Registration from './components/auth/Registration';
import { Footer } from './components/pages/Footer';
import { Header } from './components/pages/Header';

function App() {

  return (
    <>
      <Header />

      <main>
        <Router>
          <Switch>
            <Route path='/registration' component={Registration} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/account' component={UserPage} />
          </Switch>
        </Router>
      </main>
      
      <Footer />
    </>
  );
}

export default App;

import { Redirect } from 'react-router-dom';

import './Pages.css';
import { DropdownMenu } from './DropdownMenu';
import { Login } from '../auth/Login';
import { useState } from 'react';

export const Header = () => {
  const [toLogin, setToLogin] = useState(false);

  return (
    <header>
      <h1>Card Auction</h1>

      {(!!localStorage.getItem('refreshToken') && !toLogin) ? <DropdownMenu /> : <button onClick={() => setToLogin(true)}>login</button>}
      {toLogin && <Redirect to='/login'> <Login /> </Redirect>}
    </header>
  )
};
import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import './Pages.css';
import { DropdownMenu } from '../auxiliary/DropdownMenu';
import { REFRESH_TOKEN } from "../../constants/localStorage.enum";

export const Header = () => {
  const [toLogin, setToLogin] = useState(false);
  const history = useHistory()

  return (
    <header>
      <h1 onClick={() => history.push('/')}>Card Auction</h1>

      {(!!localStorage.getItem(REFRESH_TOKEN) && !toLogin) ? <DropdownMenu /> : <button onClick={() => setToLogin(true)}>login</button>}
      {toLogin && <Redirect to='/login' />}
    </header>
  )
};
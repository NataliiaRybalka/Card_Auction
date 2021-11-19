import { useState } from "react";

import './Pages.css';
import Person from "@material-ui/icons/Person";
import { Link } from 'react-router-dom';
import { ADMIN } from "../../constants/contants";

export const DropdownMenu = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div>
      <span id={'personMenuBtn'} onClick={() => setIsDropdownVisible(!isDropdownVisible)}> <Person /> </span>

      {(localStorage.getItem('role') === ADMIN) ? (
        <nav className={isDropdownVisible ? 'activepPersonMenuBlock personMenuBlock' : 'personMenuBlock'}>
          <span className={'personMenuLink'}> <Link to='/admin/account' className={'navPersonLink'}>Profile</Link> </span>
          <span className={'personMenuLink'}> <Link to='/logout' className={'navPersonLink'}>Logout</Link> </span>
        </nav>
      ) : (
        <nav className={isDropdownVisible ? 'activepPersonMenuBlock personMenuBlock' : 'personMenuBlock'}>
          <span className={'personMenuLink'}> <Link to='/account' className={'navPersonLink'}>Profile</Link> </span>
          <span className={'personMenuLink'}> <Link to='/account/history' className={'navPersonLink'}>History</Link> </span>
          <span className={'personMenuLink'}> <Link to='/account/balance' className={'navPersonLink'}>Balance</Link> </span>
          <span className={'personMenuLink'}> <Link to='/rating' className={'navPersonLink'}>Rating</Link> </span>
          <span className={'personMenuLink'}> <Link to='/logout' className={'navPersonLink'}>Logout</Link> </span>
        </nav>
      )}
    </div>
  );
};
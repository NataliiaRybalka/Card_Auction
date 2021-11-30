import { useState } from "react";
import { Link } from 'react-router-dom';

import Person from "@material-ui/icons/Person";

import './Auxiliary.css';
import { ADMIN } from "../../constants/contants";

export const DropdownMenu = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div>
      <span id={'personMenuBtn'} onClick={() => setIsDropdownVisible(!isDropdownVisible)}> <Person /> </span>

      {(localStorage.getItem('role') === ADMIN) ? (
        <nav className={isDropdownVisible ? 'activepPersonMenuBlock personMenuBlock' : 'personMenuBlock'}>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/admin/account' className={'navPersonLink'}>Profile</Link>
          </span>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/logout' className={'navPersonLink'}>Logout</Link>
          </span>
        </nav>
      ) : (
        <nav className={isDropdownVisible ? 'activepPersonMenuBlock personMenuBlock' : 'personMenuBlock'}>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/account' className={'navPersonLink'}>Profile</Link>
          </span>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/account/history' className={'navPersonLink'}>History</Link>
          </span>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/account/balance' className={'navPersonLink'}>Balance</Link>
          </span>
          <span className={'personMenuLink'} onClick={() => setIsDropdownVisible(false)}>
            <Link to='/logout' className={'navPersonLink'}>Logout</Link>
          </span>
        </nav>
      )}
    </div>
  );
};
import { useState } from "react";
import Person from "@material-ui/icons/Person";
import { Link } from 'react-router-dom';

import './Pages.css';

export const DropdownMenu = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  return (
    <div>
      <span id={'personMenuBtn'} onClick={() => setIsDropdownVisible(!isDropdownVisible)}> <Person /> </span>

      <nav className={isDropdownVisible ? 'activepPersonMenuBlock personMenuBlock' : 'personMenuBlock'}>
        <span className={'navLinkDiv personMenuLink'}> <Link to='/account' className={'navLinks navPersonLink'}>Profile</Link> </span>
        <span className={'navLinkDiv personMenuLink'}> <Link to='/account/history' className={'navLinks navPersonLink'}>History</Link> </span>
        <span className={'navLinkDiv personMenuLink'}> <Link to='/account/balance' className={'navLinks navPersonLink'}>Balance</Link> </span>
        <span className={'navLinkDiv personMenuLink'}> <Link to='/rating' className={'navLinks navPersonLink'}>Rating</Link> </span>
      </nav>
    </div>
  );
};
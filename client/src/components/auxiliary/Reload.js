import { useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import { ADMIN } from "../../constants/contants";
import { ROLE } from "../../constants/localStorage.enum";

export const Reload = () => {
  const history = useHistory();

  useEffect(() => {
    history.go(0);
  }, [history]);

  return (
    <div>
      {localStorage.getItem(ROLE) === ADMIN
        ? <Redirect to='/admin/account' />
        : <Redirect to='/account' />
      }
    </div>
  );
};
import { useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';

import { ADMIN } from "../../constants/contants";

export const Reload = () => {
  const history = useHistory();

  useEffect(() => {
    history.go(0);
  }, [history]);

  return (
    <div>
      {localStorage.getItem('role') === ADMIN
        ? <Redirect to='/admin/account' />
        : <Redirect to='/account' />
      }
    </div>
  );
};
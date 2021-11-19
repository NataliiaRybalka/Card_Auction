import { useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';

export const Reload = () => {
  const history = useHistory();

  useEffect(() => {
    history.go(0);
  }, [history])

  return (
    <div>
      {localStorage.getItem('role') === 'admin'
        ? <Redirect to='/admin/account' />
        : <Redirect to='/account' />
      }
    </div>
  );
};
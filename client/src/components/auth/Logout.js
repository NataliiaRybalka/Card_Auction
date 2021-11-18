import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import './Auth.css';
import { logout } from '../../redux/actions/auth.actions';

export const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
  localStorage.removeItem('id');

  useEffect(() => {
    dispatch(logout());
    history.go(0);
  }, [dispatch, history])

  return (
    <div>
      <Redirect to='/' />
    </div>
  );
};

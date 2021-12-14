import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';

import { LINK_FOR_CONFIRM_EMAIL } from '../../constants/contants';
import { confirmEmail } from '../../redux/actions/auth.actions';

export const Verify = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split('/')[2].split(LINK_FOR_CONFIRM_EMAIL)[0];

  useEffect(() => {
    dispatch(confirmEmail(userId));
  }, [dispatch, userId]);

  return (
    <Redirect to='/login' />
  )
};
import { useDispatch } from "react-redux";

import { logout } from '../../redux/actions/auth.actions';

export const Logout = () => {
  const dispatch = useDispatch();

  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  return (
    <div>
      <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  );
};

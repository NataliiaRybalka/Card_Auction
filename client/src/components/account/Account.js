import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './User.css';
import { LOCALHOST } from "../../constants/contants";
import { EditUserData } from "./EditUserData";
import { getUserById } from "../../redux/actions/user.actions";

export const Account = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  return (
    <div className={'userPage main'}>
      <EditUserData />

      <div>
        {!!user.image &&  <img src={`${LOCALHOST}/${user.image}`} alt={user.login} id={'userImg'} />}
        <h2 id={'userLogin'}>{user.login}</h2>
        <span>{user.email}</span>
      </div>
    </div>
  );
};
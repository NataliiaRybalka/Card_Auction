import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';

import './User.css';
import { LOCALHOST } from "../../constants/contants";
import { EditUserData } from "./EditUserData";
import { getUserById, deleteUser } from "../../redux/actions/user.actions";

export const Account = () => {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.userReducer.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserById());
  }, [dispatch]);

  const onDeleteAccountHandler = () => {
    dispatch(deleteUser());
    localStorage.clear();
    setDeleted(true);
    history.go(0);
  };

  return (
    <div className={'userPage main'}>
      <EditUserData />

      <div>
        {!!user.image
          ? <img src={`${LOCALHOST}/${user.image}`} alt={user.login} id={'userImg'} />
          : <div id={'userImgLogin'}>{!!user.login && user.login[0]}</div>
        }
        <h2 id={'userLogin'}>{user.login}</h2>
        <span>{user.email}</span>

        <span id={'deleteAccount'} onClick={onDeleteAccountHandler}>delete account</span>
      </div>

      {deleted && <Redirect to='/' />}
    </div>
  );
};
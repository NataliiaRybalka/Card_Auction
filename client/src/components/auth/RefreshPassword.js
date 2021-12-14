import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

import { Alert } from "../alert/Alert";
import { changePassword } from '../../redux/actions/auth.actions';
import { Login } from "./Login";

export const RefreshPassword = () => {
  const [password, setPassword] = useState('');
  const [toLogin, setToLogin] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const location = useLocation();
  const userId = location.pathname.split('/')[2];

  const onChangeInputHandler = e => {
    setPassword(e.target.value);
  };

  const onHandleRefreshPassword = async () => {
    dispatch(changePassword({ password, userId }));
    
    setPassword('');
    setToLogin(true);
  };
  
  return (
    <div className={'form'}>
      <div>
        <label>New Password</label>
        <input type={'password'} name={'password'} value={password} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleRefreshPassword}>send</button>

      {toLogin && <Redirect to='/login'> <Login /> </Redirect>}
    </div>
  );
};
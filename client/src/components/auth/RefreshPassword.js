import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Alert } from "../alert/Alert";
import { changePassword } from '../../redux/actions/auth.actions';

export const RefreshPassword = () => {
  const [password, setPassword] = useState('');
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
  };
  
  return (
    <div className={'form'}>
      <div>
        <label>New Password</label>
        <input type={'password'} name={'password'} value={password} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleRefreshPassword}>send</button>

    </div>
  );
};
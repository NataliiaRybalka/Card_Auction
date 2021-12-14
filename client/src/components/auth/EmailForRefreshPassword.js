import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';

import { Alert } from "../alert/Alert";
import { refreshPassword } from '../../redux/actions/auth.actions';

export const EmailForRefreshPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const confirmAlert = useAlert();

  const onChangeInputHandler = e => {
    setEmail(e.target.value)
  };

  const onSendEmailHandler = async () => {
    dispatch(refreshPassword({ email }));
    
    setEmail('');
    confirmAlert.show('Check your email.');
  };
  
  return (
    <div className={'form'}>
      <div>
        <label>Email</label>
        <input type={'email'} name={'email'} value={email} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onSendEmailHandler}>send</button>

    </div>
  );
};
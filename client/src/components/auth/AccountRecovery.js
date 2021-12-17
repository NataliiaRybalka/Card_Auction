import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';

import { Alert } from "../alert/Alert";
import { accountRecovery } from '../../redux/actions/auth.actions';

import { Email } from "./Email";

export const AccountRecovery = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const confirmAlert = useAlert();

  const onChangeInputHandler = e => {
    setEmail(e.target.value)
  };

  const onSendEmailHandler = async () => {
    dispatch(accountRecovery({ email }));
    
    setEmail('');
    confirmAlert.show('Check your email.');
  };
  
  return (
    <div className={'form'}>
      <Email value={email} changeInput={onChangeInputHandler} />

      {alert && <Alert msg={alert} />}
      
      <button onClick={onSendEmailHandler}>send</button>

    </div>
  );
};
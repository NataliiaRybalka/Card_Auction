import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';

import './Auth.css';
import { registration } from '../../redux/actions/auth.actions';
import { Alert } from "../alert/Alert";

export const Registration = () => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const confirmAlert = useAlert();

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleRegistration = async () => {
    dispatch(registration(inputValues));

    setInputValues({
      login: '',
      email: '',
      password: ''
    });
    confirmAlert.show('Please confirm your email.');
  };

  return (
    <div className={'form'}>
      <div>
        <label>Login</label>
        <input type={'text'} name={'login'} value={inputValues.login} onChange={onChangeInputHandler} />
      </div>

      <div>
        <label>Email</label>
        <input type={'email'} name={'email'} value={inputValues.email} onChange={onChangeInputHandler} />
      </div>

      <div>
        <label>Password</label>
        <input type={'password'} name={'password'} value={inputValues.password} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleRegistration}>send</button>
    </div>
  );
};
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';

import { registration } from '../../redux/actions/auth.actions';
import { Alert } from "../alert/Alert";
import { REFRESH_TOKEN } from "../../constants/localStorage.enum";

export const Registration = () => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);

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

      {!!localStorage.getItem(REFRESH_TOKEN) && <Redirect to='/reload' />}
    </div>
  );
};
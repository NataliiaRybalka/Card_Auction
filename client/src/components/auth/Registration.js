import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';

import { registration } from '../../redux/actions/auth.actions';
import { UserPage } from "../account/UserPage";
import { Alert } from "../alert/Alert";

export const Registration = () => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
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

      {user.email && <Redirect to='/account'> <UserPage /> </Redirect>}
    </div>
  );
};
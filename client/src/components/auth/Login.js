import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';
import { login } from '../../redux/actions/auth.actions';
import { UserPage } from "../account/UserPage";
import { Alert } from "../alert/Alert";

export const Login = () => {
  const [inputValues, setInputValues] = useState({
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

  const onHandleLogin = async () => {
    dispatch(login(inputValues));

    setInputValues({
      email: '',
      password: ''
    });
  };

  return (
    <div className={'form'}>
      <div>
        <label>Email</label>
        <input type={'email'} name={'email'} value={inputValues.email} onChange={onChangeInputHandler} />
      </div>

      <div>
        <label>Password</label>
        <input type={'password'} name={'password'} value={inputValues.password} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleLogin}>send</button>

      {!!localStorage.getItem('refreshToken') && (
        localStorage.getItem('role') === 'admin'
        ? <Redirect to='/admin/account'> <UserPage /> </Redirect> 
        : <Redirect to='/account'> <UserPage /> </Redirect>
      )}
    </div>
  );
};
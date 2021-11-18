import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';
import { login } from '../../redux/actions/auth.actions';
import { Account } from "../account/Account";
import { Alert } from "../alert/Alert";
import { Registration } from "./Registration";

export const Login = () => {
  const [toRegistration, setToRegistration] = useState(false);
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
      <span onClick={() => setToRegistration(true)} id={'toRegistration'}>registration</span>
      {toRegistration && <Redirect to='/registration'> <Registration /> </Redirect>}

      {!!localStorage.getItem('refreshToken') && (
        localStorage.getItem('role') === 'admin'
        ? <Redirect to='/admin/account'> <Account /> </Redirect> 
        : <Redirect to='/account'> <Account /> </Redirect>
      )}
    </div>
  );
};
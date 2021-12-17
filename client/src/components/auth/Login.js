import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';
import { login } from '../../redux/actions/auth.actions';
import { Alert } from "../alert/Alert";
import { Registration } from "./Registration";
import { LoginGoogle } from './LoginGoogle';
import { LoginFacebook } from './LoginFacebook';
import { AccountRecovery } from './AccountRecovery';
import { REFRESH_TOKEN } from "../../constants/localStorage.enum";

import { Email } from "./Email";
import { Password } from "./Password";

export const Login = () => {
  const [toRegistration, setToRegistration] = useState(false);
  const [toEmailForRefreshPassword, setToEmailForRefreshPassword] = useState(false);
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
      <Email value={inputValues.email} changeInput={onChangeInputHandler} />
      <Password value={inputValues.password} changeInput={onChangeInputHandler} />
      
      <p id={'forgotPassword'} onClick={() => setToEmailForRefreshPassword(true)}>forgot password</p>
      {toEmailForRefreshPassword && <Redirect to='/account-recovery'> <AccountRecovery /> </Redirect>}

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleLogin}>send</button>

      <div id={'loginWithBtns'}>
        <LoginGoogle />
        <LoginFacebook />
      </div>

      <span onClick={() => setToRegistration(true)} id={'toRegistration'}>registration</span>
      {toRegistration && <Redirect to='/registration'> <Registration /> </Redirect>}

      {!!localStorage.getItem(REFRESH_TOKEN) && <Redirect to='/reload' />}
    </div>
  );
};
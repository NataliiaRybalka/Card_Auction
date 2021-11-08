import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import './Auth.css';

import { registration } from '../../redux/actions/auth.actions';
import UserPage from "../account/UserPage";
import { Alert } from "../alert/Alert";

const Registration = (props) => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: ''
  });

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleRegistration = async () => {
    props.dispatch(registration(inputValues));

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

      {props.alert && <Alert msg={props.alert} />}
      
      <button onClick={onHandleRegistration}>send</button>


      {props.user.email && <Redirect to='/account'> <UserPage /> </Redirect>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    alert: state.alertReducer.alert
  }
};

export default connect(mapStateToProps)(Registration);
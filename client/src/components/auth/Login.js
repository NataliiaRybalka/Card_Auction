import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { login } from '../../redux/actions/auth.actions';
import UserPage from "../account/UserPage";
import { Alert } from "../Alert";

const Login = (props) => {
  const [inputValues, setInputValues] = useState({
    email: '',
    password: ''
  });

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleLogin = async () => {
    props.dispatch(login(inputValues));

    setInputValues({
      email: '',
      password: ''
    });
  };

  return (
    <div>
      <label>Email</label>
      <input type={'email'} name={'email'} value={inputValues.email} onChange={onChangeInputHandler} />
      <br />
      <label>Password</label>
      <input type={'password'} name={'password'} value={inputValues.password} onChange={onChangeInputHandler} />
      <br />
      <button onClick={onHandleLogin}>send</button>

      {props.alert && <Alert msg={props.alert} />}

      {props.user.email && <Redirect to='/account'> <UserPage /> </Redirect>}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user,
    userTokens: state.authReducer.userTokens,
    alert: state.alertReducer.alert
  }
};

export default connect(mapStateToProps)(Login);
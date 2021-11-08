import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';

import { registration } from '../../redux/actions/auth.actions';
import UserPage from "../account/UserPage";

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
    <div>
      <label>Login</label>
      <input type={'text'} name={'login'} value={inputValues.login} onChange={onChangeInputHandler} />
      <br />
      <label>Email</label>
      <input type={'email'} name={'email'} value={inputValues.email} onChange={onChangeInputHandler} />
      <br />
      <label>Password</label>
      <input type={'password'} name={'password'} value={inputValues.password} onChange={onChangeInputHandler} />
      <br />
      <button onClick={onHandleRegistration}>send</button>

      {props.user.email && <Redirect to='/account'> <UserPage /> </Redirect>}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Registration);
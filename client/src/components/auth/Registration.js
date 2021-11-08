import { useState } from "react";
import { connect } from "react-redux";

import { registration } from '../../redux/actions/auth.actions';

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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {user: state.authReducer.user}
};

export default connect(mapStateToProps)(Registration);
import { useState } from "react";
import { connect } from "react-redux";

import { login } from '../../redux/actions/auth.actions';

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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.authReducer.user
  }
};

export default connect(mapStateToProps)(Login);
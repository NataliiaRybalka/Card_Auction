import { useState } from "react";

export const Registration = () => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: ''
  });

  const changeInputHandler = e => {
    setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
    }));
  };

  const send = e => {
    console.log(inputValues);
  };

  return (
    <div>
      <label>Login</label>
      <input type={'text'} name={'login'} value={inputValues.login} onChange={changeInputHandler} />
      <br />
      <label>Email</label>
      <input type={'email'} name={'email'} value={inputValues.email} onChange={changeInputHandler} />
      <br />
      <label>Password</label>
      <input type={'password'} name={'password'} value={inputValues.password} onChange={changeInputHandler} />
      <br />
      <button onClick={send}>send</button>
    </div>
  );
}
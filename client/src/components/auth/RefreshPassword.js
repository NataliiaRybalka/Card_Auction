import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../alert/Alert";

export const RefreshPassword = () => {
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

  const onHandleChangePassword = async () => {
    // dispatch();
    
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
        <label>New Password</label>
        <input type={'password'} name={'password'} value={inputValues.password} onChange={onChangeInputHandler} />
      </div>

      {alert && <Alert msg={alert} />}
      
      <button onClick={onHandleChangePassword}>send</button>

    </div>
  );
};
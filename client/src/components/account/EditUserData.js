import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import './User.css';
import { editUserData } from '../../redux/actions/user.actions';
import { Alert } from "../alert/Alert";

export const EditUserData = () => {
  const [inputValues, setInputValues] = useState({
    login: '',
    email: '',
    password: '',
    image: ''
  });
  const [msg, setMsg] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangeInputHandler = e => {
    if (e.target.name === 'image') {
      setInputValues(prev => ({
        ...prev,
        ...{image: e.target.files[0]}
      }));
    } else {
      setInputValues(prev => ({
        ...prev,
        ...{[e.target.name]: e.target.value}
      }));
    }
  };

  const onHandleRegistration = async () => {
    if (inputValues.password.length > 0 && inputValues.password.length < 6) {
      setMsg(`password must be at least 6 characters`);

      setInputValues({
        login: '',
        email: '',
        password: '',
        image: ''
      });
      
      return;
    }

    for (const input in inputValues) {
      if (inputValues[input] === '') delete inputValues[input]
    }

    const formData = new FormData();
    if (inputValues.image) formData.append('image', inputValues.image);
    Object.entries(inputValues).map(([key, value]) => formData.append(key, value));
    dispatch(editUserData(formData));

    setInputValues({
      login: '',
      email: '',
      password: '',
      image: ''
    });

    history.go(0);
  };

  return (
    <div className={'userForm'}>
      <h3>Edit Profile</h3>
      <div>
        <input type={'text'} name={'login'} placeholder={'Login'} value={inputValues.login} onChange={onChangeInputHandler} />
      </div>

      <div>
        <input type={'email'} name={'email'} placeholder={'Email'} value={inputValues.email} onChange={onChangeInputHandler} />
      </div>

      <div>
        <input type={'password'} name={'password'} placeholder={'Password'} value={inputValues.password} onChange={onChangeInputHandler} />
      </div>

      <div>
        <input type={'file'} name={'image'} value={undefined} onChange={onChangeInputHandler} />
      </div>

      {msg && <Alert msg={msg} />}
      
      <button onClick={onHandleRegistration} className={'userFromBtn'}>send</button>
    </div>
  );
};
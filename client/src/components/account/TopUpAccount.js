import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { changeBalance } from "../../redux/actions/user.actions";

export const TopUpAccount = () => {
  const [inputValues, setInputValues] = useState({
    sum: ''
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleTopUpAccount = () => {
    dispatch(changeBalance(inputValues));

    setInputValues({
      sum: ''
    });

    history.go(0);
  };

  return (
    <div className={'form balanceForm'}>
      <label>Sum</label>
      <input type={'number'} name={'sum'} value={inputValues.sum} onChange={onChangeInputHandler} />
      <button onClick={onHandleTopUpAccount}>send</button>
    </div>
  );
};
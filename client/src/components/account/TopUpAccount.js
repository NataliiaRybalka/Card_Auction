import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeBalance } from "../../redux/actions/user.actions";
import { PayPal } from "../auxiliary/PayPal";

export const TopUpAccount = () => {
  const [inputValues, setInputValues] = useState({
    sum: ''
  });
  const [openPaypal, setOpenPaypal] = useState(false);
  const dispatch = useDispatch();

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleTopUpAccount = () => {
    setOpenPaypal(!openPaypal);
    // dispatch(changeBalance(inputValues));

    // setInputValues({
    //   sum: ''
    // });
  };

  return (
    <div className={'form balanceForm'}>
      <label>Sum</label>
      <input type={'number'} name={'sum'} value={inputValues.sum} onChange={onChangeInputHandler} />
      <button onClick={onHandleTopUpAccount}>send</button>

      {openPaypal && <PayPal />}
    </div>
  );
};
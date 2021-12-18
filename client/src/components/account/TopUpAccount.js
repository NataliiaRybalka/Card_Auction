import { useState } from "react";

import { PayPal } from "../auxiliary/PayPal";

export const TopUpAccount = () => {
  const [inputValues, setInputValues] = useState({
    sum: ''
  });
  const [openPaypal, setOpenPaypal] = useState(false);

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onHandleTopUpAccount = () => {
    setOpenPaypal(!openPaypal);
  };

  return (
    <>
      {!openPaypal
        ? <div className={'form balanceForm'}>
          <label>Sum</label>
          <input type={'number'} name={'sum'} value={inputValues.sum} onChange={onChangeInputHandler} />
          <button onClick={onHandleTopUpAccount}>send</button>
        </div>
        : <PayPal sum={inputValues.sum} />
      }
    </>
  );
};
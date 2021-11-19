import { useState } from "react";
import { useDispatch } from "react-redux";

import { createBet } from '../../redux/actions/auctions.actions';

export const PlaceABet = ({ isModalVisible, setIsModalVisible }) => {
  const [data, setData] = useState({
    bet: '',
    id: 1
  });
  const dispatch = useDispatch();

  const onChangeBetHandler = e => {
    setData(prev => ({
      ...prev,
      ...{[e.target.name]: +e.target.value}
    }));
  };

  const onSendBetHandler = () => {
    dispatch(createBet(data));

    setData({
      bet: '',
      id: 1
    });
    setIsModalVisible(false);
  };

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <label>Enter Your Bet</label>
          <input type={'number'} name={'bet'} value={data.bet} onChange={onChangeBetHandler} />
          <button onClick={onSendBetHandler}>send</button>
        </div>
      </div>
    </div>
  );
};
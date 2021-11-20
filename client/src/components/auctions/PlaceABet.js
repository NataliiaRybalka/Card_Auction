import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { createBet } from '../../redux/actions/auctions.actions';

export const PlaceABet = ({ isModalVisible, setIsModalVisible, idAuction }) => {
  const [data, setData] = useState({
    newPrice: ''
  });
  data.id = idAuction;
  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeBetHandler = e => {
    setData(prev => ({
      ...prev,
      ...{ [e.target.name]: +e.target.value }
    }));
  };

  const onSendBetHandler = () => {
    dispatch(createBet(data));

    setData({
      newPrice: '',
      id: null
    });
    setIsModalVisible(false);

    history.go(0);
  };

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <label>Enter Your Bet</label>
          <input type={'number'} name={'newPrice'} value={data.newPrice} onChange={onChangeBetHandler} />
          <button onClick={onSendBetHandler}>send</button>
        </div>
      </div>
    </div>
  );
};
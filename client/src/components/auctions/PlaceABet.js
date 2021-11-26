import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createBet } from '../../redux/actions/auctions.actions';
import { Alert } from "../alert/Alert";

export const PlaceABet = ({ isModalVisible, setIsModalVisible, idAuction }) => {
  const [data, setData] = useState({
    newPrice: ''
  });
  data.id = idAuction;
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const auction = useSelector(state => state.auctionsReducer.auction);

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
  };

  if (Object.keys(auction).length !== 0) {
    setIsModalVisible(false);
  }

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <label>Enter Your Bet</label>
          <input type={'number'} name={'newPrice'} value={data.newPrice} onChange={onChangeBetHandler} />
          <button onClick={onSendBetHandler}>send</button>

          {alert && <Alert msg={alert} />}
        </div>
      </div>
    </div>
  );
};
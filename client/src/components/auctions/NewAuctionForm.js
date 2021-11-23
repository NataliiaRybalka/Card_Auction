import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { Alert } from "../alert/Alert";
import { createAuction } from "../../redux/actions/auctions.actions";

export const NewAuctionForm = (props) => {
  const { card, isModalVisible, setIsModalVisible } = props;
  const [inputValues, setInputValues] = useState({
    lotId: card,
    initPrice: '',
    maxPrice: '',
    minStep: '',
    maxTime: ''
  });
  const [msg, setMsg] = useState();
  const location = useHistory();
  const dispatch = useDispatch();
  const alert = useSelector(state => state.alertReducer.alert);
  const auction = useSelector(state => state.auctionsReducer.auction);

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: Number(e.target.value)}
    }));
  };

  const onHandleCreateSet = async () => {
    for (const input in inputValues) {
      if (inputValues[input] === '') {
        setMsg(`All fields must be filled!`);
        return;
      }
    }

    dispatch(createAuction(inputValues));

    setInputValues({
      lotId: card,
      initPrice: '',
      maxPrice: '',
      minStep: '',
      maxTime: ''
    });
  };

  if (Object.keys(auction).length !== 0) {
    location.replace('/admin/auctions');
  }

  return (
    <div className={isModalVisible ? 'modal active' : 'modal'} onClick={() => setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <div>
            <label>Initial Price</label>
            <input type={'number'} name={'initPrice'} value={inputValues.initPrice} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Max Price</label>
            <input type={'number'} name={'maxPrice'} value={inputValues.maxPrice} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Min Step</label>
            <input type={'number'} name={'minStep'} value={inputValues.minStep} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Duration</label>
            <input type={'number'} name={'maxTime'} value={inputValues.maxTime} onChange={onChangeInputHandler} />
          </div>

          {msg && <Alert msg={msg} />}
          {alert && <Alert msg={alert} />}
          
          <button onClick={onHandleCreateSet}>send</button>
        </div>
      </div>
    </div>
  );
};
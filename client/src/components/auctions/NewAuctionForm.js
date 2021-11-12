import { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { Alert } from "../alert/Alert";
import { createAuction } from "../../redux/actions/auctions.actions";

const NewAuctionForm = (props) => {
  const [inputValues, setInputValues] = useState({
    lotId: props.card,
    initPrice: 0,
    maxPrice: 0,
    minStep: 0,
    maxTime: 0,
    minExtensionTime: 0
  });
  const [msg, setMsg] = useState();
  const history = useHistory();

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

    props.dispatch(createAuction(inputValues));

    setInputValues({
      lotId: 0,
      initPrice: 0,
      maxPrice: 0,
      minStep: 0,
      maxTime: 0,
      minExtensionTime: 0,
    });

    // history.go(0);
  };

  return (
    <div className={props.isModalVisible ? 'modal active' : 'modal'} onClick={() => props.setIsModalVisible(false)}>
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

          <div>
            <label>Min Extension Time</label>
            <input type={'number'} name={'minExtensionTime'} value={inputValues.minExtensionTime} onChange={onChangeInputHandler} />
          </div>

          {msg && <Alert msg={msg} />}
          
          <button onClick={onHandleCreateSet}>send</button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auction: state.auctionReducer.auction
  }
};

export default connect(mapStateToProps)(NewAuctionForm);
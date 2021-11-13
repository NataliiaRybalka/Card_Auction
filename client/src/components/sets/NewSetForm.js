import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Alert } from "../alert/Alert";
import { createSet } from "../../redux/actions/sets.actions";
import { getCards } from "../../redux/actions/cards.actions";

const NewSetForm = (props) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    bonus: '',
    cards: [],
    cardName: ''
  });
  const [msg, setMsg] = useState();
  const [arrayCardByLetters, setArrayCardByLetters] = useState([]);
  const history = useHistory();

  const dispatch = useDispatch();
  const allCards = props.cards;
  
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const onChangeInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onChangeFindInputHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));

    setArrayCardByLetters(allCards[0].filter(card => card.name.includes(e.target.value)));
  };

  const onSelectCardHandler = e => {
    setInputValues(prev => ({
      ...prev,
      ...{cards: inputValues.cards.concat([e.target.textContent])}
    }))
  };

  const onHandleCreateSet = async () => {
    for (const input in inputValues) {
      if (inputValues[input] === '') {
        setMsg(`All fields must be filled!`);
        return;
      }
    };

    delete inputValues['cardName']; 
    dispatch(createSet(inputValues));

    setInputValues({
      title: '',
      bonus: '',
      cards: [],
      cardName: ''
    });
    setArrayCardByLetters([]);

    history.go(0);
  };

  return (
    <div className={props.isModalVisible ? 'modal active' : 'modal'} onClick={() => props.setIsModalVisible(false)}>
      <div className={'modalContent'} onClick={e => e.stopPropagation()}>
        <div className={'form'}>
          <div>
            <label>Title</label>
            <input type={'text'} name={'title'} value={inputValues.title} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Bonus</label>
            <input type={'number'} name={'bonus'} value={inputValues.bonus} onChange={onChangeInputHandler} />
          </div>

          <div>
            <label>Cards</label>
            <p>{!!inputValues.cards.length && inputValues.cards.map(card => card + ', ')}</p>

            <input type={'text'} name={'cardName'} value={inputValues.cardName} onChange={onChangeFindInputHandler} />
            {!!arrayCardByLetters.length && arrayCardByLetters.map(card => <p key={card.id} onClick={onSelectCardHandler}>{card.name}</p>)}
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
    set: state.setsReducer.set,
    cards: state.cardsReducer.cards
  }
};

export default connect(mapStateToProps)(NewSetForm);
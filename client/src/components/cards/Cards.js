import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Cards.css';
import { getCards } from "../../redux/actions/cards.actions";
import { Card } from "./Card";
import NewCardForm from "./NewCardForm";

export const Cards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const cards = useSelector(state => state.cardsReducer.cards);
  
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  return (
    <div className={'adminPage'}>
      <header id={'cardPageHeader'}>
        <h2>Cards</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)}>create new card</button>
      </header>
      
      <div className={'cardsBlock'}>
        {!!cards.length && cards.map(card => <Card card={card} key={card.id} />)}
      </div>

      <NewCardForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Cards.css';
import { getCards } from "../../redux/actions/cards.actions";
import { Card } from "./Card";

export const Cards = () => {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cardsReducer.cards);
  
  useEffect(() => {
    dispatch(getCards());
  }, [dispatch]);

  const createNewCardHandler = () => {};
  
  return (
    <div className={'adminPage'}>
      <header id={'cardPageHeader'}>
        <h2>Cards</h2>
        <button id={'createCardBtn'} onClick={createNewCardHandler}>create new card</button>
      </header>
      
      <div className={'cardsBlock'}>
        {!!cards.length && cards[0].map(card => <Card card={card} key={card.id} />)}
      </div>
    </div>
  );
};
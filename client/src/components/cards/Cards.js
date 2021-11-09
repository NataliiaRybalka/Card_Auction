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
console.log(cards);
  return (
    <div className={'adminPage'}>
      <h2>Cards</h2>

      <div className={'cardsBlock'}>
        {!!cards.length && cards[0].map(card => <Card card={card} key={card.id} />)}
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCards } from "../../redux/actions/cards.actions";
import { v1 } from "uuid";

import { LIMIT } from "../../constants/contants";
import { Card } from "./Card";
import { ButtonPagination } from "../auxiliary/ButtonPagination";

export const MyCards = () => {
  const [filter, setFilter] = useState({
    limit: LIMIT,
    offset: 1
  });
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cardsReducer.cards);
  const totalItem = useSelector(state => state.cardsReducer.totalItem);

  useEffect(() => {
    dispatch(getUserCards(filter));
  }, [dispatch, filter]);

  return (
    <div className={'main'}>
      <header>
        <h2>My Cards</h2>
      </header>

      <div className={'cardsBlock'}>
        {!!cards.length && cards.map(card => <Card card={card} key={card.id + v1()} />)}
      </div>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />
    </div>
  );
};
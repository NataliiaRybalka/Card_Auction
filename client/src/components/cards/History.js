import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from "uuid";

import { getSoldUserCards } from "../../redux/actions/cards.actions";
import { HISTORY } from "../../constants/url.enum";
import { LIMIT } from "../../constants/contants";
import { Card } from "./Card";
import { ButtonPagination } from "../auxiliary/ButtonPagination";

export const History = () => {
  const [filter, setFilter] = useState({
    url: `${HISTORY}/${localStorage.getItem('id')}`,
    limit: LIMIT,
    offset: 1
  });
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cardsReducer.cards);
  const totalItem = useSelector(state => state.cardsReducer.totalItem);

  useEffect(() => {
    dispatch(getSoldUserCards(filter));
  }, [dispatch, filter])

  return (
    <div className={'main'}>
      <header id={'cardPageHeader'}>
        <h2>History</h2>
      </header>
      
      <div className={'cardsBlock'}>
        {!!cards.length && cards.map(card => <Card card={card} key={card.id + v1()} />)}
      </div>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />
    </div>
  );
};
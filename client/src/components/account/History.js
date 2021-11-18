import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSoldUserCards } from "../../redux/actions/user.actions";
import { HISTORY } from "../../constants/url.enum";
import { LIMIT } from "../../constants/contants";
import { Card } from "../cards/Card";

export const History = () => {
  const [filter, setFilter] = useState({
    url: HISTORY,
    limit: LIMIT,
    offset: 1
  });
  const dispatch = useDispatch();
  const cards = useSelector(state => state.userReducer.cards);

  useEffect(() => {
    dispatch(getSoldUserCards(filter));
  }, [dispatch])

  return (
    <div>
      <header id={'cardPageHeader'}>
        <h2>History</h2>
      </header>
      
      <div className={'cardsBlock'}>
        {!!cards.length && cards.map(card => <Card card={card} key={card.id} />)}
      </div>
    </div>
  );
};
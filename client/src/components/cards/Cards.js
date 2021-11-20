import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Cards.css';
import { getCards } from "../../redux/actions/cards.actions";
import { LIMIT, USER } from "../../constants/contants";
import { CARDS } from "../../constants/url.enum";
import { Card } from "./Card";
import { NewCardForm } from "./NewCardForm";
import { ButtonPagination } from "../pages/ButtonPagination";

export const Cards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filter, setFilter] = useState({
    url: CARDS,
    limit: LIMIT,
    offset: 1
  });

  const dispatch = useDispatch();
  const cards = useSelector(state => state.cardsReducer.cards);
  const totalItem = useSelector(state => state.cardsReducer.totalItem);
  
  useEffect(() => {
    dispatch(getCards(filter));
  }, [dispatch, filter]);

  return (
    <div className={'main'}>
      <header id={'cardPageHeader'}>
        <h2>Cards</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)} className={localStorage.getItem('role') === USER ? 'noDisplay' : ''}>create new card</button>
      </header>
      
      <div className={'cardsBlock'}>
        {!!cards.length && cards.map(card => <Card card={card} key={card.id} />)}
      </div>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />

      <NewCardForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};
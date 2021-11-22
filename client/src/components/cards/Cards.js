import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { v1 } from 'uuid';

import './Cards.css';
import { getCards } from "../../redux/actions/cards.actions";
import { LIMIT, USER } from "../../constants/contants";
import { CARDS } from "../../constants/url.enum";
import { Card } from "./Card";
import { PartOfCard } from "./PartOfCard";
import { NewCardForm } from "./NewCardForm";
import { ButtonPagination } from "../auxiliary/ButtonPagination";

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
  const location = useLocation();

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
        {!!cards.length && 
          location.pathname === '/faq/cards'
          ? cards.map(card => <PartOfCard card={card} key={card.id + v1()} />)
          : cards.map(card => <Card card={card} key={card.id + v1()} />)
        }
      </div>

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />

      <NewCardForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};
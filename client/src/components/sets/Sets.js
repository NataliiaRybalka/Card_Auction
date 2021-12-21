import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v1 } from 'uuid';

import './Sets.css';
import { LOCALHOST, USER } from "../../constants/contants";
import { getUserCardsWithoutFilter } from '../../redux/actions/cards.actions';
import { getSets } from "../../redux/actions/sets.actions";
import { NewSetForm } from "./NewSetForm";
import { ROLE } from "../../constants/localStorage.enum";

export const Sets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const sets = useSelector(state => state.setsReducer.sets);
  const userCards = useSelector(state => state.cardsReducer.userCards);

  useEffect(() => {
    dispatch(getSets());
    if (localStorage.getItem('id')) {
      dispatch(getUserCardsWithoutFilter());
    }
  }, [dispatch]);

  sets.forEach(set => {
    set.cards.forEach(card => {
      const userCard = userCards.find(val => val.id === card.id);
      if (userCard) {
        card.hasUser = true;
      }
    });
  });

  return (
    <div className={'main'}>
      <header id={'cardPageHeader'}>
        <h2>Sets</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)} className={localStorage.getItem(ROLE) === USER ? 'noDisplay' : ''}>create new set</button>
      </header>
      
      <div className={'setsBlock'}>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>cards</th>
              <th>bonus</th>
            </tr>
          </thead>

          <tbody>
            {!!sets && sets.map(cardSet => (
              <tr key={cardSet.set.id + v1()}>
                <td>{cardSet.set.title}</td>
                <td>
                  {cardSet.cards.map(card => (
                    !!card.image 
                      ? <img src={`${LOCALHOST}/${card.image}`} alt={card.name} className={`cardSetCardImg ${card.hasUser ? 'hasUser' : ''}`} key={card.id + v1()} /> 
                      : <span key={card.id + v1()} className={card.hasUser ? 'hasUserTitle' : ''}>&emsp; {card.name}</span>)
                  )}
                </td>
                <td>{cardSet.set.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewSetForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  );
};
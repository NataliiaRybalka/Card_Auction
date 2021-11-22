import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Sets.css';
import { LOCALHOST, USER } from "../../constants/contants";
import { getSets } from "../../redux/actions/sets.actions";
import { NewSetForm } from "./NewSetForm";

export const Sets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const sets = useSelector(state => state.setsReducer.sets);

  useEffect(() => {
    dispatch(getSets());
  }, [dispatch]);

  return (
    <div className={'main'}>
      <header id={'cardPageHeader'}>
        <h2>Sets</h2>
        <button id={'createCardBtn'} onClick={() => setIsModalVisible(true)} className={localStorage.getItem('role') === USER ? 'noDisplay' : ''}>create new set</button>
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
              <tr key={cardSet.set.id}>
                <td>{cardSet.set.title}</td>
                <td>
                  {cardSet.cards.map(card => (
                    !!card.image 
                      ? <img src={`${LOCALHOST}/${card.image}`} alt={card.name} className={'cardSetCardImg'} key={card.name + card.id} /> 
                      : <span key={card.name + card.id}>&emsp; {card.name}</span>)
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
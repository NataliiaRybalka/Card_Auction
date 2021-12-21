import { useState } from "react";

import './Cards.css';
import { LOCALHOST } from "../../constants/contants";
import { FullCard } from "./FullCard";

export const PartOfCard = ({ card }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={
      `${card.is_user_card ? 'card userCard' : 'card'}
      ${card.hasUser ? 'hasUser' : ''}`
    } onMouseOver={() => setIsModalVisible(true)}>
      {!!card.image && (
        <div className={'cardImgBlock'}>
          <img src={`${LOCALHOST}/${card.image}`} alt={card.name} className={'cardImg'} />
        </div>)
      }

      <div className={'cardInfoBlock'}>
        <h3 className={'cardTitle'}>{card.name}</h3>
      </div>

      <FullCard isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} card={card} />
    </div>
  );
};
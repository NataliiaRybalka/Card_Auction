import { useState } from "react";

import './Cards.css';
import { LOCALHOST } from "../../constants/contants";
import NewAuctionForm from '../auctions/NewAuctionForm';

export const Card = ({ card }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={'card'}>
      {!!card.image && (
        <div className={'cardImgBlock'}>
          <img src={`${LOCALHOST}/${card.image}`} alt={card.name} className={'cardImg'} />
        </div>)
      }

      <div className={'cardInfoBlock'}>
        <h3 className={'cardTitle'}>{card.name}</h3>
        <span className={'cardMainInfo'}>{Boolean(card.is_alive) ? 'alive' : 'dead'} - {card.species} - {card.gender}</span>
        <h4>Location:</h4>
        <span>{card.location_title} - {card.location_type}</span>
        <h4>First Episode:</h4>
        <span>{card.episode_series} - {card.episode_title} -  {card.episode_air_date}</span>

        <button className={'startAuctionBtn'} onClick={() => setIsModalVisible(true)}>start auction</button>

        <NewAuctionForm isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} card={card.id} />
      </div>
    </div>
  );
};
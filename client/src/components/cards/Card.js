import './Cards.css';

export const Card = ({ card }) => {

  return (
    <div className={'card'}>
      <div className={'cardImgBlock'}>
        <img src={''} alt={card.name} />
      </div>

      <div className={'cardInfoBlock'}>
        <h3 className={'cardTitle'}>{card.name}</h3>
        <span className={'cardMainInfo'}>{Boolean(card.is_alive) ? 'alive' : 'dead'} - {card.species} - {card.gender}</span>
        <h4>Location:</h4>
        <span>{card.location_title} - {card.location_type}</span>
        <h4>First Episode:</h4>
        <span>{card.episode_series} - {card.episode_title} -  {card.episode_air_date}</span>
      </div>
    </div>
  );
};
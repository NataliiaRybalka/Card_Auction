import './Cards.css';

export const Card = ({ card }) => {

  return (
    <div className={'card'}>
      <h3>{card.name}</h3>
      <img src={''} alt={card.name} />
      <ul>
        <li>alive: {String(Boolean(card.is_alive))}</li>
        <li>species: {card.species}</li>
        <li>type: {card.type}</li>
        <li>gender: {card.gender}</li>
        <li>location: 
          <ul>
            <li>title: {card.location_title}</li>
            <li>type: {card.type}</li>
          </ul>
        </li>
        <li>episode: 
          <ul>
            <li>title: {card.episode_title}</li>
            <li>air date: {card.episode_air_date}</li>
            <li>series: {card.episode_series}</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
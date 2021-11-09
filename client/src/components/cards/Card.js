import './Cards.css';

export const Card = ({ card }) => {

  return (
    <div className={'card'}>
      <h3>{card.name}</h3>
      <img src={''} alt={card.name} />
      <ul>
        <li>alive: {card.isAlive}</li>
        <li>species: {card.species}</li>
        <li>type: {card.type}</li>
        <li>gender: {card.gender}</li>
        <li>location: </li>
        <li>episode</li>
      </ul>
    </div>
  );
};
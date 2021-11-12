import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Auctions.css';
import { LOCALHOST } from "../../constants/contants";
import { getAuctions } from "../../redux/actions/auctions.actions";

export const Auctions = () => {
  const dispatch = useDispatch();
  const auctions = useSelector(state => state.auctionReducer.auctions);

  useEffect(() => {
    dispatch(getAuctions());
  }, [dispatch]);

  return (
    <div className={'adminPage'}>
      <h2>Auctions</h2>

      <table>
        <thead>
          <tr>
            <th>card</th>
            <th>initial price</th>
            <th>max price</th>
            <th>min step</th>
            <th>duration</th>
            <th>currect price</th>
            <th>current customer</th>
          </tr>
        </thead>

        <tbody>
          {!!auctions.length && auctions[0].map(auction => (
            <tr key={auction.id}>
              <td>
                {!!auction.card.image 
                  ? <img src={`${LOCALHOST}/${auction.card.image}`} alt={auction.card.name} className={'cardSetCardImg'} key={auction.card.name + auction.card.id} /> 
                  : <span key={auction.card.name + auction.card.id}>&emsp; {auction.card.name}</span>
                }
              </td>
              <td>{auction.init_price}</td>
              <td>{auction.max_price}</td>
              <td>{auction.min_step}</td>
              <td className={'auctionFinalDate'}>
                {auction.finalDate} &emsp;
                <span className={auction.status === 'active' ? 'auctionActiveCircle' : 'auctionInactiveCircle'}></span>
              </td>
              <td>{auction.current_price}</td>
              <td>{!!auction.customer_id && auction.customer_id.login}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
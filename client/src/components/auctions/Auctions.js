import { useState, useEffect } from "react";
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

  const [filter, setFilter] = useState({
    active: '',
    priceFrom: '',
    priceTo: '',
    sortPrice: 'DESC'
  });
  const [isVisibleFilteringList, setIsVisibleFilteringList] = useState(false);
  const [isVisibleSortingList, setIsVisibleSortingList] = useState(false);

  const onFilterHandler = () => {
    setIsVisibleFilteringList(!isVisibleFilteringList);
  };
  const onSortingHandler = () => {
    setIsVisibleSortingList(!isVisibleSortingList);
  };

  const onChangePriceInput = e => {
    setFilter(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }))
  };

  const onSelectFilterHandler = e => {
    setFilter(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }))
  };

  return (
    <div className={'adminPage'}>
      <h2>Auctions</h2>

      <div className={'auctionSelectBlock'}>
        <div className={'auctionFilteringBlock'}>
          <span onClick={onFilterHandler}>filtering</span>

          <nav className={isVisibleFilteringList ? 'auctionFiltering filterActive' : 'auctionFiltering'}>
            <span className={'filterCheckbox'}>
              <label>active</label>
              <input type={'checkbox'} name={'active'} value={'active'} onClick={onSelectFilterHandler} />
            </span>

            <span>name</span>
            <span>location</span>

            <span id={'filterPrice'}>
              <label>price</label>
              <input type={'text'} name={'priceFrom'} value={filter.priceFrom} onChange={onChangePriceInput} onBlur={onSelectFilterHandler} placeholder={'from'} />
              <input type={'text'} name={'priceTo'} value={filter.priceTo} onChange={onChangePriceInput} onBlur={onSelectFilterHandler} placeholder={'to'} />
            </span>
          </nav>
        </div>

        <div className={'auctionSortingBlock'}>
          <span onClick={onSortingHandler}>sorting</span>
          
          <nav className={isVisibleSortingList ? 'auctionSorting filterActive' : 'auctionSorting'}>
            <span className={'filterCheckbox'}>
              <label>ascending</label>
              <input type={'radio'} name={'sortPrice'} value={'ASC'} onClick={onSelectFilterHandler} />
              <br />
              <label>descending</label>
              <input type={'radio'} name={'sortPrice'} value={'DESC'} onClick={onSelectFilterHandler} />
            </span>
          </nav>
        </div>
      </div>

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
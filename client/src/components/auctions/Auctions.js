import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import './Auctions.css';
import { LOCALHOST, LIMIT } from "../../constants/contants";
import { AUCTIONS } from "../../constants/url.enum";
import { getAuctions } from "../../redux/actions/auctions.actions";
import { ButtonPagination } from "../pages/ButtonPagination";

export const Auctions = () => {
  const [filter, setFilter] = useState({
    url: AUCTIONS,
    limit: LIMIT,
    offset: 1,
    priceMin: '',
    priceMax: '',
    sortDate: 'DESC',
    lotId: '',
    lotName: '',
    cardName: ''
  });
  const [arrayCardByLetters, setArrayCardByLetters] = useState([]);
  const dispatch = useDispatch();
  const auctions = useSelector(state => state.auctionsReducer.auctions);
  const auctionsWithoutPagination = useSelector(state => state.auctionsReducer.auctionsWithoutPagination);
  const totalItem = useSelector(state => state.auctionsReducer.totalItem);
  
  let auctionCards = [];
  !!auctionsWithoutPagination.length && auctionsWithoutPagination.map(auction => auctionCards.push(auction.card));
  auctionCards = auctionCards.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i);

  useEffect(() => {
    dispatch(getAuctions(filter));
  }, [dispatch, filter]);

  const onChangeNameInputHandler = e => {
    setFilter(prev => ({
      ...prev,
      ...{cardName: e.target.value},
      ...{lotName: e.target.textContent}
    }));

    if (e.target.value !== '') {
      setArrayCardByLetters(auctionCards.filter(card => card.name.includes(e.target.value)));
    } else if (e.target.value !== '') {
      setArrayCardByLetters([]);
    }
  };

  const onSelectNameHandler = e => {
    setFilter(prev => ({
      ...prev,
      ...{lotId: arrayCardByLetters.find(card => card.name === e.target.textContent).id},
      ...{lotName: e.target.textContent},
      ...{cardName: e.target.textContent}
    }));

    setArrayCardByLetters([]);
  };

  const onChangeInputHandler = e => {
    setFilter(prev => ({
      ...prev,
      ...{[e.target.name]: e.target.value}
    }));
  };

  const onSelectFilterHandler = () => {
    delete filter['cardName']; 
    dispatch(getAuctions(filter));

    setFilter(prev => ({
      ...prev,
      ...{cardName: ''}
    }));
  };

  return (
    <div className={'adminPage'}>
      <h2>Auctions</h2>

      <div className={'nameAndBtnBlock'}>
        <div>
          <input type={'text'} name={'cardName'} placeholder={'card name'} id={'cardNameInput'} value={filter.lotName ? filter.lotName : filter.cardName} onChange={onChangeNameInputHandler} />
          {!!arrayCardByLetters.length && arrayCardByLetters.map(card => <p key={card.id} onClick={onSelectNameHandler} className={'arrayCardByLetters'} >{card.name}</p>)}
        </div>

        <button onClick={onSelectFilterHandler} className={'filterOkBtn'}>find</button>
      </div>

      <div className={'auctionFilterBlock'}>
        <span id={'filterPrice'}>
          <label>current price</label>
          <input className={'priceFilterInput'} type={'text'} name={'priceMin'} value={filter.priceMin} onChange={onChangeInputHandler} placeholder={'min'} />
          <span>&ndash;</span>
          <input className={'priceFilterInput'} type={'text'} name={'priceMax'} value={filter.priceMax} onChange={onChangeInputHandler} placeholder={'max'} />
        </span>

        <span className={'filterCheckbox'}>
          <label>ascending</label>
          <input type={'radio'} name={'sortDate'} value={'ASC'} onChange={onChangeInputHandler} />
          <br />
          <label>descending</label>
          <input type={'radio'} name={'sortDate'} value={'DESC'} onChange={onChangeInputHandler} />
        </span>
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
          {!!auctions.length && auctions.map(auction => (
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

      <ButtonPagination totalItem={totalItem} setFilter={setFilter} />
    </div>
  );
};
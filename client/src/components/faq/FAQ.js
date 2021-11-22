import { Redirect, useHistory } from 'react-router-dom';

import './FAQ.css';

export const FAQ = () => {
  const history = useHistory();

  const onSelectCardsHandler = () => {
    history.push('/faq/cards');
    history.go(0);
  };
  const onSelectSetsHandler = () => {
    history.push('/faq/sets');
  };

  return (
    <div className={'main faqPage'}>
      <span type="button" onClick={onSelectCardsHandler} className={'faqBtn faqBtnCards'}>Cards</span>
      <span type="button" onClick={onSelectSetsHandler} className={'faqBtn'}>Sets</span>

      <Redirect to='/faq/cards' />
    </div>
  );
};
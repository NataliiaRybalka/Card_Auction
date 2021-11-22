import { Redirect, useHistory } from 'react-router-dom';

import './FAQ.css';

export const FAQ = () => {
  const history = useHistory();

  const onCardsHandler = () => {
    history.push('/faq/cards');
    history.go(0);
  };

  const onSetsHandler = () => {
    history.push('/faq/sets');
  };

  return (
    <div className={'main faqPage'}>
      <h2 className={'faqBtn faqBtnCards'} onClick={onCardsHandler}>Cards</h2>
      <h2 className={'faqBtn'} onClick={onSetsHandler}>Sets</h2>

      <Redirect to='/faq/cards' />
    </div>
  );
};
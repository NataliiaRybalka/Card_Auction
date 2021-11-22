import { useHistory } from 'react-router-dom';

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
    </div>
  );
};

{/* 
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Cards } from '../cards/Cards';
import { Sets } from '../sets/Sets';

<Router>
  <div className={'main faqPage'}>
    <Link to='/faq/cards' className={'navLinks'}> <h2 className={'faqBtn faqBtnCards'}>Cards</h2> </Link>
    <Link to='/faq/sets' className={'navLinks'}> <h2 className={'faqBtn'}>Sets</h2> </Link>

    <Redirect to='/faq/cards' />
  </div>

  <Switch>
    <Route path='/faq/cards' component={Cards} />
    <Route path='/faq/sets' component={Sets} />
  </Switch>
</Router>
*/}
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import './FAQ.css';
import { Cards } from '../cards/Cards';
import { Sets } from '../sets/Sets';

export const FAQ = () => {

  return (
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
  );
};
import { render } from 'react-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router} from 'react-router-dom';
import { positions, Provider as AlertProvider } from 'react-alert';
import AlertMUITemplate from 'react-alert-template-mui';

import './index.css';
import App from './App';
import { rootReducer } from './redux/reducers/root.reducer';
import { sagaWatcher } from './saga/saga.watcher';

const saga = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(
    saga
  ),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

saga.run(sagaWatcher);

const options = {
  position: positions.MIDDLE
};

render(
  <Provider store={store}>
    <AlertProvider template={AlertMUITemplate} {...options} >
      <Router>
        <App />
      </Router>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);


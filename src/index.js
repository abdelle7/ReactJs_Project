import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers'
import {getUsersSaga} from './Sagas'
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware();
const store=createStore(reducers,composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(getUsersSaga);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

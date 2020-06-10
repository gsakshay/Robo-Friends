import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import { rootReducer } from "./redux/rootReducer";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";


const logger = createLogger();
const store = createStore(rootReducer,applyMiddleware(thunk,logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/css/core-style.css';
// import '../src/assets/css/index.css' // альтернативный css, если шрифт не нравится
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store/configure_store';

const store = configureStore();

ReactDOM.render(

  <React.StrictMode>
	  <Provider store={ store }>
      <App />
	  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
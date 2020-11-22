import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index'
import StoreContext from './context/StroeContext'
import 'antd/dist/antd.css';
import "./utils/socket"

//引入语言
// import { IntlProvider } from 'react-intl';
// import zh_CN from "./lang/zh_CN"     
// import en_US from "./lang/en_US" 
// const localeMap={
//   en:en_US,
//   zh:zh_CN,
// }
ReactDOM.render(
  // <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>
  // </React.StrictMode>,
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

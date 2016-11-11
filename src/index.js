/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
//import { Provider } from 'react-redux';
//import { Router, browserHistory } from 'react-router';
//import routes from './routes';
//import configureStore from './store/configureStore';
//require('./favicon.ico'); // Tell webpack to load favicon.ico
import './css/bootstrap/stylesheets/_bootstrap.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './css/bootstrap/sb-admin-2.css';
import './css/main.css'

//import { syncHistoryWithStore } from 'react-router-redux';
import Main from './components/Main.jsx';


//const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store);
let appName = "Buscador ChileCompra";


render(<Main appName={appName} />, document.getElementById("app"));
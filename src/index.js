/* eslint-disable import/default */
// import React from 'react';
// import {render} from 'react-dom';
// import { Provider } from 'react-redux';
// import { Router, browserHistory } from 'react-router';
// import { AppContainer } from 'react-hot-loader';
// import routes from './routes';
// import configureStore from './store/configureStore';
require('react-hot-loader/patch');
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './css/bootstrap/stylesheets/_bootstrap.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './css/bootstrap/sb-admin-2.css';
import './css/main.scss';

import {getUserSubscriptions} from './actions/UserActions';
import {getUserSearches} from './actions/UserActions';
import {getUserNotifications} from './actions/UserActions';
import {validateToken} from './actions/authInfoResultsActions';
import {onLoadFetchOrgPub as getOrganismosPublicos} from './actions/onLoadFetchOrgPub';
import {onLoadFetchEstLic as getEstadosLicitacion} from './actions/onLoadFetchEstLic';



const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const actions = {getUserSubscriptions, getUserSearches,
				 getUserNotifications, validateToken,
				 getOrganismosPublicos, getEstadosLicitacion};


render(
   <AppContainer>
    <Root store={store} history={history} actions={actions} />
   </AppContainer>, document.getElementById("app")
    );

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const Root = require('./containers/Root').default;
		render(
			<AppContainer>
				<Root store={store} history={history} />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}

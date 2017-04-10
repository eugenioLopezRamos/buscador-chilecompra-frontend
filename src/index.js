
require('react-hot-loader/patch');
import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore} from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore';
import Root from './containers/Root.jsx';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './css/bootstrap/stylesheets/_bootstrap.scss';
import './css/bootstrap/sb-admin-2.css';
import './css/main.scss';
import {initialUserDataLoad} from './actions/UserActions';
import {validateToken} from './actions/authInfoResultsActions';
import {fetchOrganismosPublicos} from './actions/fetchOrganismosPublicosActions';
import {fetchEstadosLicitacion} from './actions/fetchEstadosLicitacionActions';



const store = configureStore();
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);
const actions = {
				initialUserDataLoad,
				validateToken,
				fetchOrganismosPublicos, fetchEstadosLicitacion
				};


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

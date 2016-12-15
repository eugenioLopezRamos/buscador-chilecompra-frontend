import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Header from './components/Header.jsx';
import App from './components/App';
//import Content from './components/Content.jsx';
import Introduction from './components/Introduction.jsx';
import InputFieldsContainer from './components/InputFieldsContainer.jsx';
import SearchResults from './components/SearchResults.jsx';
import UserPage from './components/user/UserPage.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Introduction}/>
    <Route path="/busqueda" component={InputFieldsContainer} />
    <Route path="/perfil" component={UserPage} />


  

  </Route>
);
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Header from './components/Header.jsx';
import App from './components/App';
import Footer from './components/Footer.jsx';
import Dummy from './components/Dummy.jsx';
//import Content from './components/Content.jsx';
import Introduction from './components/Introduction.jsx';
import InputFieldsContainer from './components/InputFieldsContainer.jsx';
import SearchResults from './components/SearchResults.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Introduction}/>
    <Route path="/dummy" component={Dummy} />
    <Route path="/footer" component={Footer} />
    <Route path="/fields" component={InputFieldsContainer}>
      <Route path="/fields/:sort_by" component={Dummy} />
    </Route>

  

  </Route>
);
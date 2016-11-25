import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Header from './components/Header.jsx';
import App from './components/App';
import Footer from './components/Footer.jsx';
import Dummy from './components/Dummy.jsx';
//import Content from './components/Content.jsx';
import Introduction from './components/Introduction.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dummy}/>
    <Route path="/demo" component={Introduction} />
    <Route path="/footer" component={Footer} />

  </Route>
);
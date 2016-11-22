import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/Main.jsx';
import Content from './components/Content.jsx';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Main}/>

  </Route>
);
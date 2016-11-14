import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/Main';
import Content from './components/Content';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Content}/>

  </Route>
);
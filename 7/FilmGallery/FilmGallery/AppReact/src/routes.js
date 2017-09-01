import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
//import LoginPage  from './containers/LoginPage';
import List from './components/List';
import Film from './components/Film';
import NotFound from './components/NotFound';
//import requireAuthentication from './containers/AuthenticatedComponent';

export const routes = (
  <div>
    <Route path='/' component={App}>
        <IndexRoute component={List} />
        <Route path='/film/:film' component={Film}></Route>
    </Route>
    <Route path='*' component={NotFound} />
  </div>
);
        //<Route path='/login' component={LoginPage} />
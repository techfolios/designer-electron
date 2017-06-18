import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Root from './components/Root.jsx';

ReactDOM.render((
  <BrowserRouter>
    <Route path='*' component={Root} />
  </BrowserRouter>
), document.getElementById('root'));

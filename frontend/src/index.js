import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import Routes from './routes';

ReactDOM.render(
  <App routes={Routes} />,
  document.getElementById('app')
);

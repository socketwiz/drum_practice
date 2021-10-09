
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import SongList from './pages/songs-list.js';

export default function Routes() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
           renders the first one that matches the current URL. */}
        <Switch>
          <Route path={'/'}>
            <SongList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

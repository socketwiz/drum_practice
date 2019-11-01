
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import DrumPractice from './containers/drum-practice';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from './reducers/index';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={DrumPractice} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

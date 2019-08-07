import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ControlsPage from './containers/ControlsPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.CONTROLS} component={ControlsPage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
